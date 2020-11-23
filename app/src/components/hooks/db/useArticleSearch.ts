import { useState, useEffect, useMemo } from "react";
import { Article } from "types/Article";
import { Container } from "types/Container";
import { useArticleIndex } from "../algolia";
import { notNull, QueryResult } from "../createStoreHook";
import { useArticles } from "./useArticles";

type ArticlesQuery = {
  search: {
    text: string;
  };
};

export function useArticleSearch(
  query: ArticlesQuery
): QueryResult<Container<Article>> {
  const [ids, setIds] = useState<string[]>([]);
  const [busy, setBusy] = useState<boolean>(false);
  const searchIndex = useArticleIndex();

  useEffect(() => {
    setBusy(true);

    searchIndex
      .search(query.search.text)
      .then((results) => {
        return results.hits.map((hit) => hit.objectID);
      })
      .then(setIds)
      .finally(() => {
        setBusy(false);
      });
  }, [searchIndex, query]);

  const articlesResult = useArticles(ids);

  const list = useMemo(
    () => ids.map((id) => articlesResult.data[id]).filter(notNull),
    [ids, articlesResult.data]
  );

  return useMemo(
    () => ({
      busy: busy || articlesResult.busy,
      data: list,
    }),
    [articlesResult.busy, list, busy]
  );
}
