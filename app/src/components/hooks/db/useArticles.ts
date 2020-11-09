import { useEffect, useMemo, useState } from "react";
import { articleConverter } from "types/adapters";
import { Article } from "types/types";
import { useArticleIndex } from "components/hooks/algolia";
import { useDB } from "../useDB";
import { useObjectStore } from "components/context/ObjectStoreContext";

type QueryResult<T> = {
  busy: boolean;
  data: T;
};

export function useArticleStore(ids: string[]): QueryResult<Article[]> {
  const [store, setStore] = useObjectStore();

  const db = useDB();

  const collection = useMemo(() => {
    return db.collection("articles").withConverter(articleConverter);
  }, [db]);

  useEffect(() => {
    const unsubs: (() => void)[] = [];
    for (const id of ids) {
      const unsub = collection.doc(id).onSnapshot((snapshot) => {
        const article = snapshot.data();
        setStore((store) => ({ ...store, [id]: article }));
      });
      unsubs.push(unsub);
    }

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [ids, collection, setStore]);

  const articles: Article[] = [];

  let busy = false;
  for (const id of ids) {
    if (id in store) {
      articles.push(store[id] as Article);
    } else {
      busy = true;
    }
  }

  return {
    busy: busy,
    data: articles,
  };
}

type ArticlesQuery = {
  search: {
    text: string;
  };
};

export function useArticleSearch(query: ArticlesQuery): QueryResult<Article[]> {
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
