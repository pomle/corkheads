import { useState, useEffect, useMemo, useRef } from "react";
import { User } from "types/User";
import { SearchQuery, useSearch } from "../algolia";
import { QueryRequest } from "../store2/useStore";

export type UserSearchQuery = SearchQuery;

type Match = {
  matchedWords: string[];
  value: string;
};

type Matches<T> = Record<Partial<keyof T>, Match>;

type SearchHit<T> = {
  userId: string;
  matches?: Matches<T>;
};

export type SearchResult = SearchHit<User>;

export function useUserSearch(
  query: UserSearchQuery
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

      if (results.users) {
        setResults((results.users.hits as unknown) as SearchResult[]);
      }
    });
  }, [search, setResults, query]);

  return useMemo(
    () => ({
      busy,
      results,
    }),
    [busy, results]
  );
}
