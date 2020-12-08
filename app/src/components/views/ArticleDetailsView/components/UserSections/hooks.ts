import { useMemo } from "react";
import { debounce } from "lib/debounce";
import { getPreferredBottling } from "lib/patch";
import { Bottling } from "types/Bottling";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import { useUserArticleBottlingUpdate } from "components/hooks/db/useUserArticleBottlingUpdate";
import { useUserCollectionArticle } from "components/hooks/db/useUserCollectionArticles";
import { Inventory } from "types/Inventory";
import { useUserCollectionArticleInventoryUpdate } from "components/hooks/db/useUserCollectionArticleInventoryUpdate";

const STORE_DELAY = 5000;

export function useBottling(userId: string, articleId: string) {
  const article = useArticle(articleId)?.data;
  const userArticle = useUserArticle(userId, articleId)?.data;

  const bottling = useMemo((): Bottling => {
    return getPreferredBottling(article, userArticle);
  }, [article, userArticle]);

  const updateBottling = useUserArticleBottlingUpdate(userId, articleId);
  const handleBottlingChange = useMemo(() => {
    return debounce(updateBottling, STORE_DELAY);
  }, [updateBottling]);

  return useMemo(
    () => ({
      bottling,
      handleBottlingChange,
    }),
    [bottling, updateBottling]
  );
}

export function useInventory(userId: string, articleId: string) {
  const userCollectionArticleEntry = useUserCollectionArticle(
    userId,
    articleId
  );

  const userCollectionArticle = userCollectionArticleEntry?.data;

  const inventory = useMemo((): Inventory => {
    return userCollectionArticle?.inventory || {};
  }, [userCollectionArticle]);

  const updateInventory = useUserCollectionArticleInventoryUpdate(
    userId,
    articleId
  );

  const handleInventoryChange = useMemo(() => {
    return debounce(updateInventory, STORE_DELAY);
  }, [updateInventory]);

  return useMemo(
    () => ({
      inventory,
      handleInventoryChange,
    }),
    [userCollectionArticle, inventory, handleInventoryChange]
  );
}
