import { useMemo } from "react";
import {
  createStoreHook,
  useFlatResult,
} from "components/hooks/createStoreHook";
import { converter, Article } from "types/article";
import { useDB } from "../useDB";

export function useArticleCollection() {
  const db = useDB();
  return useMemo(() => db.collection("articles").withConverter(converter), [
    db,
  ]);
}

export const useArticleStore = createStoreHook<Article>(useArticleCollection);

export function useArticle(articleId: string) {
  const result = useArticleStore([articleId]);
  return useFlatResult(articleId, result);
}
