import { useCallback } from "react";
import { Inventory } from "types/Inventory";
import { useUserCollectionArticle } from "./useUserCollectionArticles";

export function useUserCollectionArticleInventoryUpdate(
  userId: string,
  articleId: string
) {
  const userCollectionArticleEntry = useUserCollectionArticle(
    userId,
    articleId
  );

  return useCallback(
    (inventory: Inventory) => {
      if (!userCollectionArticleEntry) {
        return;
      }

      userCollectionArticleEntry.doc.set(
        {
          inventory,
        },
        { mergeFields: ["inventory"] }
      );
    },
    [userCollectionArticleEntry]
  );
}
