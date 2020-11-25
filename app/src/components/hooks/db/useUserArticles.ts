import { useFlatResult, useStore } from "components/hooks/createStoreHook";
import { UserArticle } from "types/UserArticle";
import { useUserCollection } from "./useCollection";

export function useUserArticles(userId: string, articleIds: string[]) {
  const collection = useUserCollection(userId).userArticle;
  return useStore<UserArticle>(collection, articleIds);
}

export function useUserArticle(userId: string, articleId: string) {
  const result = useUserArticles(userId, [articleId]);
  return useFlatResult(articleId, result);
}
