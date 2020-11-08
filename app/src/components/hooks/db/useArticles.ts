import { useEffect, useMemo, useState } from "react";
import { articleConverter } from "types/adapters";
import { Article } from "types/types";
import { useArticleIndex } from "components/hooks/algolia";
import { useDB } from "../useDB";
import { useObjectStore } from "components/context/ObjectStoreContext";

export function useArticleStore(ids: string[]): Article[] {
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
        if (article) {
          setStore((store) => ({ ...store, [article.id]: article }));
        }
      });
      unsubs.push(unsub);
    }

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [ids, collection, setStore]);

  const articles: Article[] = [];

  for (const id of ids) {
    if (store[id]) {
      articles.push(store[id] as Article);
    }
  }

  return articles;
}

type QueryResult<T> = {
  busy: boolean;
  data: T[];
};

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

  const articles = useArticleStore(ids);

  return {
    busy,
    data: articles,
  };
}
