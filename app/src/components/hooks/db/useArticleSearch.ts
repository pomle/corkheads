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

type SearchHit = {
  objectID: string;
};

export type SearchResult = {
  hit: SearchHit;
  entry: GuaranteedEntry<Article>;
};

type ArticleSearchResults = {
  busy: boolean;
  results: SearchResult[];
};

export function useArticleSearch(
  query: ArticleSearchQuery
): ArticleSearchResults {
  const [hits, setHits] = useState<SearchHit[]>([]);
  const { busy, search } = useSearch();
  const flight = useRef<number>(0);

  useEffect(() => {
    const flightRecord = ++flight.current;

    if (query.search.text.length === 0) {
      setHits([]);
      return;
    }

    search(query.search.text).then((results) => {
      if (flight.current !== flightRecord) {
        return;
      }

      setHits(results.hits);
    });
  }, [setHits, search, query]);

  const articleIds = hits.map((hit) => hit.objectID);
  const articlesResult = useArticles(articleIds);

  const results = useMemo(() => {
    if (!articlesResult) {
      console.log("Returning 0");
      return [];
    }

    const results: SearchResult[] = [];
    for (const hit of hits) {
      const entry = articlesResult[hit.objectID];
      if (isGuaranteed(entry)) {
        results.push({
          hit,
          entry,
        });
      }
    }

    return results;
  }, [hits, articlesResult]);

  return useMemo(
    () => ({
      busy,
      results,
    }),
    [busy, results]
  );
}
