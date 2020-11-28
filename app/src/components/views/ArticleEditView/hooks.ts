import { useCallback } from "react";
import { User } from "types/User";
import { Article } from "types/Article";
import { useDB } from "components/hooks/useDB";
import {
  ImageUpload,
  useUserImageUpload,
} from "components/hooks/useUserImageUpload";
import { findBestSizeMatch, Size } from "lib/image/size";

type Payload = {
  user: User;
  article: Article;
  file?: File;
};

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

export function useCommitArticle() {
  const uploadFile = useUserImageUpload();
  const db = useDB();

  return useCallback(
    async ({ user, article, file }: Payload) => {
      let photoURL;
      if (file) {
        const result = await uploadFile(user, file);
        photoURL = await getPhotoURL(result);
      }

      const data = {
        ...article,
        userId: user.uid,
      };

      if (photoURL) {
        data.photoURL = photoURL;
      }

      return db.collection("articles").add(data);
    },
    [db, uploadFile]
  );
}
