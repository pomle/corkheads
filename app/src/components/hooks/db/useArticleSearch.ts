import { useState, useEffect, useMemo, useRef } from "react";
import { Article } from "types/Article";
import { GuaranteedEntry, isGuaranteed } from "types/Entry";
import { useArticles } from "./useArticles";
import { ArticleSearchQuery, useSearch } from "../algolia";
import { UserArticle } from "types/UserArticle";
import { ResultMap } from "../store2/ResultMap";
import { QueryResult } from "../store2/useStore";

export type { ArticleSearchQuery };

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

const EMPTY: ResultMap<SearchResult> = new ResultMap();

export function useArticleSearch(
  query: ArticleSearchQuery
): QueryResult<SearchResult> {
  const [hits, setHits] = useState<SearchHit<Article>[]>([]);
  const { busy, search } = useSearch();
  const flight = useRef<number>(0);

  useEffect(() => {
    const flightRecord = ++flight.current;

    if (query.search.text.length === 0) {
      setHits([]);
      return;
    }

    search(query).then((results) => {
      if (flight.current !== flightRecord) {
        return;
      }

      const hits: Map<string, SearchHit<Article & UserArticle>> = new Map();

      results.articles.hits.forEach((hit) => {
        const record = {
          articleId: hit.objectID,
          matches: hit._highlightResult as Matches<Article & UserArticle>,
        };

        hits.set(hit.objectID, record);
      });

      if (results.userArticles) {
        results.userArticles.hits.forEach((hit: any) => {
          if (!hits.has(hit.articleId)) {
            const record = {
              articleId: hit.articleId,
              matches: hit._highlightResult as Matches<Article & UserArticle>,
            };
            hits.set(hit.articleId, record);
          }
        });
      }

      setHits(Array.from(hits.values()));
    });
  }, [setHits, search, query]);

  const articleIds = hits.map((hit) => hit.articleId);
  const articlesResult = useArticles(articleIds);

  return useMemo(() => {
    if (articlesResult.size === 0) {
      console.log("Returning empty");
      return {
        busy,
        results: EMPTY,
      };
    }

    const results: ResultMap<SearchResult> = new ResultMap();
    for (const hit of hits) {
      const articleId = hit.articleId;
      const entry = articlesResult.get(articleId);
      if (entry && isGuaranteed(entry)) {
        results.set(articleId, {
          hit,
          entry,
        });
      }
    }

    return {
      busy: busy || hits.length !== results.size,
      results,
    };
  }, [busy, hits, articlesResult]);
}
