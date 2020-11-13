import { useEffect, useMemo, useState } from "react";
import { articleConverter } from "types/adapters";
import { useArticleIndex } from "components/hooks/algolia";
import { createStoreHook } from "../createStoreHook";
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

function useMapToList<T>(ids: string[], index: { [key: string]: T }) {
  return useMemo(() => {
    return ids.filter((id) => index[id]).map((id) => index[id]);
  }, [ids, index]);
}

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

  const data = useMapToList(ids, articleResult.data);

  return useMemo(
    () => ({
      busy: busy || articleResult.busy,
      data,
    }),
    [articleResult.busy, data, busy]
  );
}
