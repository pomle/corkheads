import { shrinkToFitRect } from "lib/math";
import { createBlob, loadImage, resize } from "./conversion";
import { Size } from "./size";

export function loadFileAsImage(file: File): Promise<HTMLImageElement> {
  const fileURL = URL.createObjectURL(file);
  const imagePromise = loadImage(fileURL);
  imagePromise.finally(() => {
    URL.revokeObjectURL(fileURL);
  });
  return imagePromise;
}

export function downscale(inputImage: HTMLImageElement, size: Size) {
  const FORMAT = "image/jpeg";
  const QUALITY = 0.9;

  const outputSize = shrinkToFitRect(
    {
      x: inputImage.width,
      y: inputImage.height,
    },
    {
      x: size.width,
      y: size.height,
    }
  );

  const outputImage = resize(inputImage, {
    width: outputSize.x,
    height: outputSize.y,
  });

  return createBlob(outputImage, FORMAT, QUALITY);
}
