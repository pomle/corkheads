import { useSingle, useStore } from "components/hooks/store2/useStore";
import { UserArticle } from "types/UserArticle";
import { useUserCollection } from "./useCollection";

export function useUserArticles(userId: string, articleIds: string[]) {
  const collection = useUserCollection(userId).userArticle;
  return useStore<UserArticle>(collection, articleIds);
}

export function useUserArticle(userId: string, articleId?: string) {
  return useSingle(
    useUserArticles(userId, articleId ? [articleId] : []),
    articleId
  );
}
