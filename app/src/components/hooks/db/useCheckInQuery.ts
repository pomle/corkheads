import { useEffect, useMemo, useState } from "react";
import { CheckIn } from "types/CheckIn";
import { QueryRequest } from "../store2/useStore";
import { useDB } from "../useDB";

type SortOrder = {
  field: keyof CheckIn;
  dir?: string;
};

export type CheckInQuery = {
  filters?: {
    userIds?: string[];
    articleIds?: string[];
  };
  order?: SortOrder[];
  limit?: number;
};

export type CheckInPointer = {
  articleId: string;
  checkInId: string;
  userId: string;
};

export function useCheckInQuery(
  query: CheckInQuery
): QueryRequest<CheckInPointer> {
  const [results, setResults] = useState<CheckInPointer[]>([]);

  const db = useDB();

  useEffect(() => {
    let q = db.collection("check-ins").limit(10);

    if (query.filters) {
      const filters = query.filters;
      if (filters.userIds) {
        q = q.where("userId", "in", query.filters.userIds);
      }

      if (filters.articleIds) {
        q = q.where("articleId", "in", query.filters.articleIds);
      }
    }

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
        const data = doc.data();
        return {
          checkInId: doc.id,
          articleId: data.articleId,
          userId: data.userId,
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
