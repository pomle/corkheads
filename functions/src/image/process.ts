import * as sharp from "sharp";
import { admin } from "../admin";
import { fitRect } from "./math";

const userBucket = admin.storage().bucket("corkheads-user-public-media");
const genBucket = admin.storage().bucket("generated-media.corkheads.com");

type Size = {
  x: number;
  y: number;
};

type Format = "webp" | "jpeg";

type Metadata = {
  resolution: Size;
  size: number;
};

const FORMATS: Format[] = ["webp", "jpeg"];

const SIZES: Size[] = [80, 160, 320, 640, 1280, 1920].map((n) => ({
  x: n,
  y: n,
}));

type Derivate = {
  size: Size;
  format: Format;
  contentType: string;
  formatId: string;
  file: ReturnType<typeof createOutput>;
};

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

function createURL(path: string) {
  return `https://generated-media.corkheads.com/${path}`;
}

function createStreamProcessor(resolution: Size, format: Format) {
  return sharp()
    .resize(resolution.x, resolution.y, {
      fit: "cover",
    })
    .rotate()
    .toFormat(format, {
      quality: 80,
    });
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

  const effectiveSizes = SIZES.filter((size) => {
    return (
      sourceMeta.resolution.x >= size.x || sourceMeta.resolution.y >= size.y
    );
  });

  const derivatives: Derivate[] = [];

  for (const bounds of effectiveSizes) {
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
        contentType: `image/${format}`,
        formatId,
        file,
      });
    }
  }

  const inputStream = source.createReadStream();
  inputStream.setMaxListeners(20);

  const tasks = derivatives.map(async (derivate) => {
    await new Promise((resolve, reject) => {
      const outputStream = derivate.file.createWriteStream();
      const processStream = createStreamProcessor(
        derivate.size,
        derivate.format
      );

      inputStream.on("error", reject);
      processStream.on("error", reject);
      outputStream.on("error", reject);

      outputStream.on("finish", resolve);

      console.log("Starting processing %s / %s", imageId, derivate.formatId);
      inputStream.pipe(processStream).pipe(outputStream);
    });

    await derivate.file.setMetadata({
      contentType: derivate.contentType,
    });

    return {
      url: createURL(derivate.file.name),
      derivate,
    };
  });

  return Promise.all(tasks);
}
