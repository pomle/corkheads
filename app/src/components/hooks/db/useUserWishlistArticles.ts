import { useFlatResult, useStore } from "components/hooks/store2/useStore";
import { UserWishlistArticle } from "types/UserWishlistArticle";
import { useUserCollection } from "./useCollection";

export function useUserWishlistArticles(userId: string, articleIds: string[]) {
  const collection = useUserCollection(userId).userWishlistArticle;
  return useStore<UserWishlistArticle>(collection, articleIds);
}

export function useUserWishlistArticle(userId: string, articleId: string) {
  const result = useUserWishlistArticles(userId, [articleId]);
  return useFlatResult(articleId, result);
}
