import { useCallback } from "react";
import { getEffectiveBottlingChanges } from "lib/patch";
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

      const effectiveBottling = getEffectiveBottlingChanges(bottling, article);

      return userArticleEntry.doc.set(
        {
          bottling: effectiveBottling,
        },
        {
          mergeFields: ["bottling"],
        }
      );
    },
    [article, userArticleEntry]
  );
}
