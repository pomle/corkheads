export type Size = {
  width: number;
  height: number;
};

type Format = "image/jpeg" | "image/png" | "image/webp";

export function loadImage(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.src = url;
  });
}

export function resize(
  image: HTMLImageElement | HTMLCanvasElement,
  size: Size
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size.width;
  canvas.height = size.height;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Could not get context from canvas");
  }
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
}

export function createBlob(
  canvas: HTMLCanvasElement,
  format: Format,
  quality?: number
) {
  return new Promise<Blob>((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Blob object missing"));
            return;
          }

          resolve(blob);
        },
        format,
        quality
      );
    } catch (error) {
      reject(error);
    }
  });
}
