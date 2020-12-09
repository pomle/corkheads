import { useState, useEffect, useMemo, useRef } from "react";
import { Article } from "types/Article";
import { GuaranteedEntry, isGuaranteed } from "types/Entry";
import { useArticles } from "./useArticles";
import { useSearch } from "../algolia";

export type ArticleSearchQuery = {
  search: {
    text: string;
  };
};

type ArticleSearchResults = {
  busy: boolean;
  results: GuaranteedEntry<Article>[];
};

export function useArticleSearch(
  query: ArticleSearchQuery
): ArticleSearchResults {
  const [ids, setIds] = useState<string[]>([]);
  const { busy, search } = useSearch();
  const flight = useRef<number>(0);

  useEffect(() => {
    const flightRecord = ++flight.current;

    if (query.search.text.length === 0) {
      setIds([]);
      return;
    }

    search(query.search.text).then((results) => {
      if (flight.current !== flightRecord) {
        return;
      }

      const ids = results.hits.map((hit) => hit.objectID);
      setIds(ids);
    });
  }, [setIds, search, query]);

  const articlesResult = useArticles(ids);

  const results = useMemo(() => {
    if (!articlesResult) {
      console.log("Returning 0");
      return [];
    }

    const entries: GuaranteedEntry<Article>[] = [];
    for (const id of ids) {
      const entry = articlesResult[id];
      if (isGuaranteed(entry)) {
        entries.push(entry);
      }
    }

    return entries;
  }, [ids, articlesResult]);

  return useMemo(
    () => ({
      busy,
      results,
    }),
    [busy, results]
  );
}
