import * as sharp from "sharp";
import { admin } from "../admin";

const userBucket = admin.storage().bucket("corkheads-user-public-media");
const genBucket = admin.storage().bucket("corkheads-generated-media");

type Size = {
  x: number;
  y: number;
};

type Metadata = {
  resolution: Size;
  size: number;
};

const SIZES: Size[] = [80, 160, 320, 640, 1280, 1920].map((n) => ({
  x: n,
  y: n,
}));

function createURL(bucket: string, path: string) {
  return `https://storage.googleapis.com/${bucket}/${path}`;
}

function createStreamProcessor(resolution: Size) {
  return sharp()
    .resize(resolution.x, resolution.y, {
      fit: "contain",
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    });
}

function createSource(sourceId: string) {
  return userBucket.file(sourceId);
}

function createOutput(imageId: string, formatId: string) {
  const loc = ["images", imageId, formatId].join("/");
  return genBucket.file(loc);
}

export function processSource(sourceId: string, imageId: string) {
  console.log("Processing %s for %s", sourceId, imageId);
  const source = createSource(sourceId);

  const derivatives = SIZES.map((size) => {
    const formatId = `${size.x}x${size.y}.webp`;
    const file = createOutput(imageId, formatId);

    return {
      size,
      formatId,
      file,
    };
  });

  const inputStream = source.createReadStream();
  inputStream.setMaxListeners(20);

  const tasks = derivatives.map(async (derivate) => {
    await new Promise<typeof derivate>((resolve, reject) => {
      const outputStream = derivate.file.createWriteStream();
      const processStream = createStreamProcessor(derivate.size);

      inputStream.on("error", reject);
      processStream.on("error", reject);
      outputStream.on("error", reject);

      outputStream.on("finish", resolve);

      console.log("Starting processing %s / %s", imageId, derivate.formatId);
      inputStream.pipe(processStream).pipe(outputStream);
    });

    const meta = await new Promise<Metadata>((resolve, reject) => {
      const generatedStream = derivate.file.createReadStream();
      generatedStream
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

    await derivate.file.setMetadata({
      contentType: "image/webp",
    });

    return {
      url: createURL(derivate.file.bucket.name, derivate.file.name),
      derivate,
      meta,
    };
  });

  return Promise.all(tasks);
}
