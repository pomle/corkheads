import { useState, useEffect, useMemo } from "react";
import { Article } from "types/article";
import { useArticleIndex } from "../algolia";
import { QueryResult, toList } from "../createStoreHook";
import { useArticleStore } from "./useArticles";

type ArticlesQuery = {
  search: {
    text: string;
  };
};

export function useArticleSearch(query: ArticlesQuery): QueryResult<Article> {
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

  const articlesResult = useArticleStore(ids);

  const list = useMemo(() => toList(ids, articlesResult.data), [
    ids,
    articlesResult.data,
  ]);

  return useMemo(
    () => ({
      busy: busy || articlesResult.busy,
      data: list,
    }),
    [articlesResult.busy, list, busy]
  );
}
