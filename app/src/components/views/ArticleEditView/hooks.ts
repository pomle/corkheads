import { useCallback } from "react";
import { User } from "types/User";
import { useUserUpload } from "components/hooks/useUserUpload";
import { Article } from "types/Article";
import { useDB } from "components/hooks/useDB";

type Payload = {
  user: User;
  article: Article;
  file?: File;
};

export function useCommitArticle() {
  const uploadFile = useUserUpload();
  const db = useDB();

  return useCallback(
    async ({ user, article, file }: Payload) => {
      const uploadResult = await (file && uploadFile(user, file));

      const photoURL = await (uploadResult &&
        (uploadResult.ref.getDownloadURL() as Promise<string>));

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
