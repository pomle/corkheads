import { useState, useEffect, useMemo, useRef } from "react";
import { Article } from "types/Article";
import { GuaranteedEntry, isGuaranteed } from "types/Entry";
import { useArticles } from "./useArticles";
import { useSearch } from "../algolia";
import { UserArticle } from "types/UserArticle";

export type ArticleSearchQuery = {
  search: {
    text: string;
  };
};

type Match = {
  matchedWords: string[];
  value: string;
};

type Matches<T> = Record<Partial<keyof T>, Match>;

type SearchHit<T> = {
  articleId: string;
  userId?: string;
  matches?: Matches<T>;
};

export type SearchResult = {
  hit: SearchHit<Article>;
  entry: GuaranteedEntry<Article>;
};

type ArticleSearchResults = {
  busy: boolean;
  results: SearchResult[];
};

export function useArticleSearch(
  query: ArticleSearchQuery
): ArticleSearchResults {
  const [hits, setHits] = useState<SearchHit<Article>[]>([]);
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

      const hits: Map<string, SearchHit<Article & UserArticle>> = new Map();

      results.articles.hits.forEach((hit) =>
        hits.set(hit.objectID, {
          articleId: hit.objectID,
          matches: hit._highlightResult as Matches<Article & UserArticle>,
        })
      );

      setHits(Array.from(hits.values()));
    });
  }, [setHits, search, query]);

  const articleIds = hits.map((hit) => hit.articleId);
  const articlesResult = useArticles(articleIds);

  const results = useMemo(() => {
    if (!articlesResult) {
      console.log("Returning 0");
      return [];
    }

    const results: SearchResult[] = [];
    for (const hit of hits) {
      const entry = articlesResult[hit.articleId];
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
