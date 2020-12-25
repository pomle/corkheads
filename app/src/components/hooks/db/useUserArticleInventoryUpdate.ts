import { useCallback } from "react";
import { Inventory } from "types/Inventory";
import { useUserArticle } from "./useUserArticles";

export function useUserArticleInventoryUpdate(
  userId: string,
  articleId: string
) {
  const userArticleEntry = useUserArticle(userId, articleId);

  return useCallback(
    (inventory: Inventory) => {
      if (!userArticleEntry) {
        return;
      }

      userArticleEntry.doc.set(
        {
          inventory,
        },
        { mergeFields: ["inventory"] }
      );
    },
    [userArticleEntry]
  );
}
