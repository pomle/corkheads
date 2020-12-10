import { useFlatResult, useStore } from "components/hooks/useStore";
import { Article } from "types/Article";
import { useCollection } from "./useCollection";

export function useArticles(articleIds: string[]) {
  return useStore<Article>(useCollection().article, articleIds);
}

export function useArticle(articleId: string) {
  const result = useArticles([articleId]);
  return useFlatResult(articleId, result);
}
