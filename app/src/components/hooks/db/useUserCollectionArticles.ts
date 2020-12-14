import { useSingle, useStore } from "components/hooks/store2/useStore";
import { UserCollectionArticle } from "types/UserCollectionArticle";
import { useUserCollection } from "./useCollection";

export function useUserCollectionArticles(
  userId: string,
  articleIds: string[]
) {
  const collection = useUserCollection(userId).userCollectionArticle;
  return useStore<UserCollectionArticle>(collection, articleIds);
}

export function useUserCollectionArticle(userId: string, articleId?: string) {
  return useSingle(
    useUserCollectionArticles(userId, articleId ? [articleId] : []),
    articleId
  );
}
