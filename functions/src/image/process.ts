import * as sharp from "sharp";
import { admin } from "../admin";
import { fitRect } from "./math";

const userBucket = admin.storage().bucket("corkheads-user-public-media");
const genBucket = admin.storage().bucket("corkheads-generated-media");

type Format = "jpeg" | "webp";

type Size = {
  x: number;
  y: number;
};

type Metadata = {
  resolution: Size;
  size: number;
};

type Derivative = {
  size: Size;
  format: Format;
  mime: string;
  formatId: string;
  file: ReturnType<typeof createOutput>;
};

const FORMATS: Format[] = ["webp"];

const SIZES: Size[] = [80, 160, 320, 640, 1280, 1920].map((n) => ({
  x: n,
  y: n,
}));

function readMeta(file: ReturnType<typeof userBucket.file>) {
  return new Promise<Metadata>((resolve, reject) => {
    const stream = file.createReadStream();
    stream
      .pipe(
        sharp().metadata((error, metadata) => {
          if (error) {
            return reject(error);
          }

          resolve({
            size: metadata.size || 0,
            resolution: {
              x: metadata.width || 0,
              y: metadata.height || 0,
            },
          });
        })
      )
      .on("error", reject);
  });
}

function createURL(bucket: string, path: string) {
  return `https://storage.googleapis.com/${bucket}/${path}`;
}

function createStreamProcessor({ size, format }: Derivative) {
  return sharp()
    .resize(size.x, size.y, {
      fit: "cover",
    })
    .rotate()
    .toFormat(format, { quality: 80 });
}

function createSource(sourceId: string) {
  return userBucket.file(sourceId);
}

function createOutput(imageId: string, formatId: string) {
  const path = ["images", imageId, formatId].join("/");
  return genBucket.file(path);
}

export async function processSource(sourceId: string, imageId: string) {
  console.log("Processing %s for %s", sourceId, imageId);
  const source = createSource(sourceId);

  const sourceMeta = await readMeta(source);

  const activeSizes = SIZES.filter((size) => {
    return (
      sourceMeta.resolution.x >= size.x || sourceMeta.resolution.y >= size.y
    );
  });

  const derivatives: Derivative[] = [];

  for (const bounds of activeSizes) {
    for (const format of FORMATS) {
      const formatId = `${bounds.x}x${bounds.y}.${format}`;
      const file = createOutput(imageId, formatId);

      const size = fitRect(sourceMeta.resolution, bounds);

      derivatives.push({
        size: {
          x: Math.round(size.x),
          y: Math.round(size.y),
        },
        format,
        mime: `image/${format}`,
        formatId,
        file,
      });
    }
  }

  const inputStream = source.createReadStream();
  inputStream.setMaxListeners(20);

  const tasks = derivatives.map(async (derivate) => {
    await new Promise<typeof derivate>((resolve, reject) => {
      const outputStream = derivate.file.createWriteStream();
      const processStream = createStreamProcessor(derivate);

      inputStream.on("error", reject);
      processStream.on("error", reject);
      outputStream.on("error", reject);

      outputStream.on("finish", resolve);

      console.log("Starting processing %s / %s", imageId, derivate.formatId);
      inputStream.pipe(processStream).pipe(outputStream);
    });

    await derivate.file.setMetadata({
      contentType: derivate.mime,
    });

    return {
      url: createURL(derivate.file.bucket.name, derivate.file.name),
      mime: derivate.mime,
      derivate,
    };
  });

  return tasks;
}
