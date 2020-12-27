import { useState, useEffect, useMemo, useRef } from "react";
import { Article } from "types/Article";
import { SearchQuery, useSearch } from "../algolia";
import { UserArticle } from "types/UserArticle";
import { User } from "types/User";

export type { SearchQuery };

type Match = {
  matchedWords: string[];
  value: string;
};

type Matches<T> = Record<Partial<keyof T>, Match>;

export type ArticleHit = {
  articleId: string;
  userId?: string;
  matches?: Matches<Article & UserArticle>;
};

export type UserHit = {
  userId: string;
  matches?: Matches<User["profile"]>;
};

export type SearchResults = {
  article: ArticleHit[];
  user: UserHit[];
};

const EMPTY: SearchResults = {
  article: [],
  user: [],
};

export function useOmniSearch(query: SearchQuery) {
  const [results, setResults] = useState<SearchResults>(EMPTY);
  const { busy, search } = useSearch();
  const flight = useRef<number>(0);

  useEffect(() => {
    const flightRecord = ++flight.current;

    if (query.search.text.length === 0) {
      setResults(EMPTY);
      return;
    }

    search(query).then((results) => {
      if (flight.current !== flightRecord) {
        return;
      }

      const hits: Map<string, ArticleHit> = new Map();

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

      setResults({
        article: Array.from(hits.values()),
        user: results.users
          ? ((results.users.hits as unknown) as UserHit[])
          : [],
      });
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
