import { useCollectionResult } from "@pomle/react-firebase";
import { UserArticle } from "types/UserArticle";
import { useSingle } from "./helpers/useSingle";
import { useUserCollection } from "./useCollection";

export function useUserArticles(userId: string, articleIds: string[]) {
  const collection = useUserCollection(userId).userArticle;
  return useCollectionResult<UserArticle>(collection, articleIds);
}

export function useUserArticle(userId: string, articleId?: string) {
  return useSingle(
    useUserArticles(userId, articleId ? [articleId] : []),
    articleId
  );
}
