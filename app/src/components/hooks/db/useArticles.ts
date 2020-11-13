import { useEffect, useMemo, useState } from "react";
import { articleConverter } from "types/adapters";
import { useArticleIndex } from "components/hooks/algolia";
import { createStoreHook, toList } from "../createStoreHook";
import { Article } from "types/types";

export const useArticleStore = createStoreHook<Article>(
  (db) => db.collection("articles").withConverter(articleConverter),
  "articles"
);

export function useArticle(articleId: string) {
  const ids = useMemo(() => [articleId], [articleId]);
  const result = useArticleStore(ids);
  return {
    busy: result.busy,
    data: articleId in result.data ? result.data[articleId] : undefined,
  };
}

type ArticlesQuery = {
  search: {
    text: string;
  };
};

export function useArticleSearch(query: ArticlesQuery) {
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

  const articleResult = useArticleStore(ids);

  const list = useMemo(() => toList(ids, articleResult.data), [
    ids,
    articleResult.data,
  ]);

  return useMemo(
    () => ({
      busy: busy || articleResult.busy,
      data: list,
    }),
    [articleResult.busy, list, busy]
  );
}
