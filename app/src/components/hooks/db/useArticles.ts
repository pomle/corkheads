import { useEffect, useState } from "react";
import { articleConverter } from "types/adapters";
import { useArticleIndex } from "components/hooks/algolia";
import { createStoreHook } from "../createStoreHook";
import { Article } from "types/types";

export const useArticleStore = createStoreHook<Article>((db) =>
  db.collection("articles").withConverter(articleConverter)
);

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

  return {
    busy: busy || articleResult.busy,
    data: articleResult.data,
  };
}
