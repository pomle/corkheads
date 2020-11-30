import { diffBottling } from "lib/patch";
import { useCallback } from "react";
import { Bottling } from "types/Bottling";
import { useArticle } from "./useArticles";
import { useUserArticle } from "./useUserArticles";

export function useUserArticleBottlingUpdate(
  userId: string,
  articleId: string
) {
  const article = useArticle(articleId)?.data;
  const userArticleEntry = useUserArticle(userId, articleId);

  return useCallback(
    (bottling: Bottling) => {
      if (!article || !userArticleEntry) {
        return;
      }

      let effective = bottling;

      const existingBottling = article?.bottling;
      if (existingBottling) {
        effective = diffBottling(existingBottling, effective);
      }

      userArticleEntry.doc.update({
        bottling: effective,
      });
    },
    [article, userArticleEntry]
  );
}
