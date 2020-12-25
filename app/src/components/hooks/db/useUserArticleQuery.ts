import { useEffect, useMemo, useState } from "react";
import { UserArticle } from "types/UserArticle";
import { QueryRequest } from "../store2/useStore";
import { useDB } from "../useDB";

type SortFields = "rating.love" | "rating.score" | keyof UserArticle;

type SortOrder = {
  field: SortFields;
  dir?: string;
};

export type UserArticleQuery = {
  filters: {
    userId: string;
    owner?: boolean;
  };
  order?: SortOrder[];
  limit?: number;
};

export type UserArticlePointer = {
  articleId: string;
  userId: string;
};

export function useUserArticleQuery(
  query: UserArticleQuery
): QueryRequest<UserArticlePointer> {
  const [results, setResults] = useState<UserArticlePointer[]>([]);

  const db = useDB();

  useEffect(() => {
    const userId = query.filters.userId;

    let q = db.collection("users").doc(userId).collection("articles").limit(20);

    if (query.filters.owner !== undefined) {
      q = q.where("owner", "==", query.filters.owner);
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
        return {
          articleId: doc.id,
          userId,
        };
      });
      setResults(results);
    });
  }, [db, query, setResults]);

  return useMemo(
    () => ({
      busy: false,
      results,
    }),
    [results]
  );
}
