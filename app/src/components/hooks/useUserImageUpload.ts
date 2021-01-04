import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "components/hooks/useStorage";
import { User } from "types/User";
import { useDB } from "./useDB";

export function useUserImageUpload() {
  const storage = useStorage();
  const db = useDB();

  const uploadImage = useCallback(
    async (user: User, file: File) => {
      const uploadId = uuidv4();

      const sourceRef = storage.ref(user.id).child("source").child(uploadId);
      const imageRef = db.collection("images").doc();

      await sourceRef.put(file);
      await imageRef.set({
        userId: user.id,
        source: sourceRef.fullPath,
      });

      return imageRef;
    },
    [db, storage]
  );

  return uploadImage;
}
