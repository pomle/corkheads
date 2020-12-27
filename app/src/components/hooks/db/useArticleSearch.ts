import { useState, useEffect, useMemo, useRef } from "react";
import { Article } from "types/Article";
import { SearchQuery, useSearch } from "../algolia";
import { UserArticle } from "types/UserArticle";
import { QueryRequest } from "../store2/useStore";

export type ArticleSearchQuery = SearchQuery;

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

export type SearchResult = SearchHit<Article & UserArticle>;

export function useArticleSearch(
  query: ArticleSearchQuery
): QueryRequest<SearchResult> {
  const [results, setResults] = useState<SearchResult[]>([]);
  const { busy, search } = useSearch();
  const flight = useRef<number>(0);

  useEffect(() => {
    const flightRecord = ++flight.current;

    if (query.search.text.length === 0) {
      setResults([]);
      return;
    }

    search(query).then((results) => {
      if (flight.current !== flightRecord) {
        return;
      }

      const hits: Map<string, SearchHit<Article & UserArticle>> = new Map();

      if (results.articles) {
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
      }

      setResults(Array.from(hits.values()));
    });
  }, [setResults, search, query]);

  return useMemo(
    () => ({
      busy,
      results,
    }),
    [busy, results]
  );
}
