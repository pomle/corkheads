import { useEffect, useMemo, useState } from "react";
import { useDB } from "../useDB";
import { QueryRequest } from "./types";

type SortOrder = {
  field: "timestamp";
  dir?: string;
};

export type FollowingQuery = {
  userId: string;
  order?: SortOrder[];
  limit?: number;
};

export type UserPointer = {
  userId: string;
};

export function useFollowingQuery(
  query: FollowingQuery
): QueryRequest<UserPointer> {
  const [results, setResults] = useState<UserPointer[]>([]);

  const db = useDB();

  useEffect(() => {
    let q = db
      .collection("users")
      .doc(query.userId)
      .collection("following")
      .limit(10);

    if (query.order) {
      for (const sort of query.order) {
        q = q.orderBy(sort.field, sort.dir as "asc" | "desc");
      }
    }

    if (query.limit) {
      q = q.limit(query.limit);
    }

    return q.onSnapshot((result) => {
      const results = result.docs.map((doc) => {
        return {
          userId: doc.id,
        };
      });
      setResults(results);
    });
  }, [db, query]);

  return useMemo(
    () => ({
      busy: false,
      results,
    }),
    [results]
  );
}
