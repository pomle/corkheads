import { useMemo } from "react";
import { debounce } from "lib/debounce";
import { getPreferredBottling } from "lib/patch";
import { Bottling } from "types/Bottling";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import { useUserArticleBottlingUpdate } from "components/hooks/db/useUserArticleBottlingUpdate";
import { useUserArticleInventoryUpdate } from "components/hooks/db/useUserArticleInventoryUpdate";
import { Inventory } from "types/Inventory";

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
    [bottling, handleBottlingChange]
  );
}

export function useInventory(userId: string, articleId: string) {
  const userArticleEntry = useUserArticle(userId, articleId);

  const userArticle = userArticleEntry?.data;

  const inventory = useMemo((): Inventory => {
    return userArticle?.inventory || {};
  }, [userArticle]);

  const updateInventory = useUserArticleInventoryUpdate(userId, articleId);

  const handleInventoryChange = useMemo(() => {
    return debounce(updateInventory, STORE_DELAY);
  }, [updateInventory]);

  return useMemo(
    () => ({
      inventory,
      handleInventoryChange,
    }),
    [inventory, handleInventoryChange]
  );
}
