import { useCallback } from "react";
import { useStorage } from "components/hooks/useStorage";
import { downscale, loadFileAsImage } from "lib/image/format";
import { Image } from "types/Image";
import { User } from "types/User";
import { useDB } from "./useDB";

const TEMP_SIZE = { x: 1280, y: 1280 };

async function createTemporaryImage(
  ref: firebase.storage.Reference,
  file: File
) {
  const sourceImage = await loadFileAsImage(file);
  const tempImage = await downscale(sourceImage, {
    width: TEMP_SIZE.x,
    height: TEMP_SIZE.y,
  });

  await ref.put(tempImage);
}

export function useUserImageUpload() {
  const storage = useStorage();
  const db = useDB();

  const uploadImage = useCallback(
    async (user: User, file: File) => {
      const imageRef = db.collection("images").doc();
      const uploadId = imageRef.id;

      const sourceRef = storage.ref(user.id).child("source");
      const originalRef = sourceRef.child(uploadId);
      const tempRef = sourceRef.child(uploadId);
      await createTemporaryImage(tempRef, file);

      originalRef.put(file);

      const image: Image = {
        id: imageRef.id,
        userId: user.id,
        source: originalRef.fullPath,

        // This temporary format is to speed up the uploading from the uploaders
        // point of view and will be promptly overwritten by generated formats.
        formats: [
          {
            resolution: TEMP_SIZE,
            url: await tempRef.getDownloadURL(),
          },
        ],
      };

      imageRef.set(image);

      return imageRef;
    },
    [db, storage]
  );

  return uploadImage;
}
