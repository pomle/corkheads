import { useState, useEffect, useMemo, useRef } from "react";
import { User } from "types/User";
import { QueryRequest } from "../store2/useStore";
import { useDB } from "../useDB";

export type UserSearchQuery = {
  search: {
    text: string;
  };
  limit?: number;
};

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
  const [busy, setBusy] = useState<boolean>(false);

  const flight = useRef<number>(0);

  const db = useDB();

  useEffect(() => {
    const flightRecord = ++flight.current;

    if (query.search.text.length === 0) {
      setResults([]);
      setBusy(false);
      return;
    }

    setBusy(true);

    let q = db.collection("users").limit(20);
    q = q.where("profile.username", "==", query.search.text);

    if (query.limit) {
      q = q.limit(query.limit);
    }

    return q.onSnapshot((result) => {
      if (flight.current !== flightRecord) {
        return;
      }

      setBusy(false);

      const results = result.docs.map((doc) => {
        return {
          userId: doc.id,
        };
      });
      setResults(results);
    });
  }, [db, setResults, query]);

  return useMemo(
    () => ({
      busy,
      results,
    }),
    [busy, results]
  );
}
