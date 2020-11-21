import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { useStorage } from "components/hooks/useStorage";
import { User } from "types/User";

export function useUserUpload() {
  const storage = useStorage();

  const uploadFile = useCallback(
    (user: User, file: File) => {
      const fileId = uuidv4();
      const fileRef = storage.ref(user.uid).child(fileId);
      return fileRef.put(file);
    },
    [storage]
  );

  return uploadFile;
}
