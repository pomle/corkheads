import { useSingle, useStore } from "components/hooks/store2/useStore";
import { Article } from "types/Article";
import { useCollection } from "./useCollection";

export function useArticles(articleIds: string[]) {
  return useStore<Article>(useCollection().article, articleIds);
}

export function useArticle(articleId?: string) {
  return useSingle(useArticles(articleId ? [articleId] : []), articleId);
}
