import { Size, findBestSizeMatch } from "lib/image/size";
import { useCallback } from "react";
import { useUser } from "./useUser";
import { ImageUpload, useUserImageUpload } from "./useUserImageUpload";

function findIdealUpload(uploads: ImageUpload[], imageSize: Size) {
  const sizes = uploads.map((u) => u.size);
  const size = findBestSizeMatch(sizes, imageSize);
  return uploads.find((u) => u.size === size);
}

function getPhotoURL(uploads: ImageUpload[]) {
  const upload = findIdealUpload(uploads, { width: 1280, height: 1280 });
  return upload?.task.then((snap) => {
    return snap.ref.getDownloadURL() as Promise<string>;
  });
}

export function usePhotoUpload() {
  const user = useUser();
  const uploadFile = useUserImageUpload();

  return useCallback(
    async (file: File) => {
      if (!user) {
        throw new Error("No user");
      }
      const result = await uploadFile(user, file);
      const photoURL = await getPhotoURL(result);
      return photoURL;
    },
    [user, uploadFile]
  );
}
