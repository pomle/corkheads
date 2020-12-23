import { useCallback, useMemo } from "react";
import merge from "deepmerge";
import { Article } from "types/Article";
import { useDB } from "components/hooks/useDB";
import { usePhotoUpload } from "components/hooks/usePhotoUpload";
import { Bottling, createBottling } from "types/Bottling";

type Payload = {
  article: Article;
  file?: File;
};

export function useCommitArticle() {
  const uploadFile = usePhotoUpload();
  const db = useDB();

  return useCallback(
    async ({ article, file }: Payload) => {
      let photoURL;
      if (file) {
        photoURL = await uploadFile(file);
      }

      const data = {
        ...article,
      };

      if (photoURL) {
        data.photoURL = photoURL;
      }

      return db.collection("articles").add(data);
    },
    [db, uploadFile]
  );
}

export function useBottling(article: Article): Bottling {
  const initial = useMemo(createBottling, []);

  return useMemo((): Bottling => {
    return merge(initial, article.bottling || {});
  }, [initial, article.bottling]);
}
