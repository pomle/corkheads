import { useCollectionResult } from "@pomle/react-firebase";
import { Article } from "types/Article";
import { useSingle } from "./helpers/useSingle";
import { useCollection } from "./useCollection";

export function useArticles(articleIds: string[]) {
  return useCollectionResult<Article>(useCollection().article, articleIds);
}

export function useArticle(articleId?: string) {
  return useSingle(useArticles(articleId ? [articleId] : []), articleId);
}
