import { useEffect, useMemo, useState } from "react";
import { createStoreHook, toList } from "components/hooks/createStoreHook";
import { useArticleIndex } from "components/hooks/algolia";
import { converter, Article } from "types/article";
import { useDB } from "../useDB";
import { User } from "types/user";

export function useArticleCollection() {
  const db = useDB();
  return useMemo(() => db.collection("articles").withConverter(converter), [
    db,
  ]);
}

export function useUserArticleCollection(user: User) {
  const db = useDB();
  return useMemo(
    () => db.collection("users").doc(user.uid).collection("articles"),
    [db, user]
  );
}

export const useArticleStore = createStoreHook<Article>(useArticleCollection);

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
