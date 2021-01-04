import { useCallback, useMemo } from "react";
import merge from "deepmerge";
import { Article } from "types/Article";
import { useDB } from "components/hooks/useDB";
import { useImageUpload } from "components/hooks/useImageUpload";
import { Bottling, createBottling } from "types/Bottling";

type Payload = {
  article: Article;
  file?: File;
};

export function useCommitArticle() {
  const uploadFile = useImageUpload();
  const db = useDB();

  return useCallback(
    async ({ article, file }: Payload) => {
      const data = {
        ...article,
      };

      if (file) {
        data.imageId = (await uploadFile(file)).id;
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
