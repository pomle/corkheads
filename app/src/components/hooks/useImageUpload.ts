import { useCallback } from "react";
import { useMe } from "./useMe";
import { useUserImageUpload } from "./useUserImageUpload";

export function useImageUpload() {
  const user = useMe();
  const uploadFile = useUserImageUpload();

  return useCallback(
    (file: File) => {
      if (!user) {
        throw new Error("No user");
      }
      return uploadFile(user, file);
    },
    [user, uploadFile]
  );
}
