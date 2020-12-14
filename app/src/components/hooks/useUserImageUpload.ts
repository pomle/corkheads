import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "components/hooks/useStorage";
import { User } from "types/User";
import { Size } from "lib/image/size";
import { downscale, loadFileAsImage } from "lib/image/format";

export type ImageUpload = {
  fileId: string;
  size: Size;
  task: Promise<firebase.storage.UploadTaskSnapshot>;
};

const sizes: Size[] = [640, 1280, 1920].map((n) => ({ width: n, height: n }));

function getEffectiveSizes(image: HTMLImageElement) {
  const effective = sizes.filter((size) => {
    return image.width > size.width || image.height > size.height;
  });

  if (effective.length === 0) {
    effective.push(sizes[0]);
  }

  return effective;
}

export function useUserImageUpload() {
  const storage = useStorage();

  const uploadImage = useCallback(
    async (user: User, file: File): Promise<ImageUpload[]> => {
      const sourceImage = await loadFileAsImage(file);

      const formats = getEffectiveSizes(sourceImage).map((size) => {
        const image = downscale(sourceImage, size);
        return {
          size,
          image,
        };
      });

      const uploadId = uuidv4();

      const imageStorageRef = storage
        .ref(user.id)
        .child("images")
        .child(uploadId);

      let chain: Promise<unknown> = Promise.resolve();
      function link<T>(fn: () => Promise<T>): Promise<T> {
        chain = chain.then(() => fn());
        return chain as Promise<T>;
      }

      const uploads = formats.map(
        ({ image, size }): ImageUpload => {
          const fileId = `${size.width}x${size.height}`;
          const fileRef = imageStorageRef.child(fileId);
          return {
            task: link(() => image.then((blob) => fileRef.put(blob))),
            fileId,
            size,
          };
        }
      );

      return uploads;
    },
    [storage]
  );

  return uploadImage;
}
