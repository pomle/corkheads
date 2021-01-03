import * as sharp from "sharp";
import { admin } from "../admin";
import { fitRect } from "./math";

const userBucket = admin.storage().bucket("corkheads-user-public-media");
const genBucket = admin.storage().bucket("corkheads-generated-media");

type Size = {
  x: number;
  y: number;
};

const SIZES: Size[] = [80, 160, 320, 640, 1280, 1920].map((n) => ({
  x: n,
  y: n,
}));

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

  const tasks = derivatives.map(async (derivate) => {
    const process = new Promise<typeof derivate>((resolve, reject) => {
      const outputStream = derivate.file.createWriteStream();
      const processStream = createStreamProcessor(derivate.size);

      inputStream.on("error", reject);
      processStream.on("error", reject);
      outputStream.on("error", reject);

      outputStream.on("finish", resolve);

      console.log("Starting processing %s / %s", imageId, derivate.formatId);
      inputStream.pipe(processStream).pipe(outputStream);
    });

    const size = new Promise<Size>((resolve, reject) => {
      inputStream
        .pipe(
          sharp().metadata((error, metadata) => {
            if (error) {
              return reject(error);
            }

            const inputSize = {
              x: metadata.width || 0,
              y: metadata.height || 0,
            };

            const outputSize = fitRect(inputSize, derivate.size);

            resolve(outputSize);
          })
        )
        .on("error", reject);
    });

    await process;

    await derivate.file.setMetadata({
      contentType: "image/webp",
    });

    return {
      derivate,
      size: await size,
    };
  });

  return Promise.all(tasks);
}
