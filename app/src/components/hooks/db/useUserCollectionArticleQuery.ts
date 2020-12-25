import { useEffect, useMemo, useState } from "react";
import { UserCollectionArticle } from "types/UserCollectionArticle";
import { QueryRequest } from "../store2/useStore";
import { useDB } from "../useDB";

type SortOrder = {
  field: keyof UserCollectionArticle;
  dir?: string;
};

export type UserCollectionArticleQuery = {
  filters: {
    userId: string;
  };
  order?: SortOrder[];
  limit?: number;
};

export type UserArticlePointer = {
  articleId: string;
  userId: string;
};

export function useUserCollectionArticleQuery(
  query: UserCollectionArticleQuery
): QueryRequest<UserArticlePointer> {
  const [results, setResults] = useState<UserArticlePointer[]>([]);

  const db = useDB();

  useEffect(() => {
    const userId = query.filters.userId;

    let q = db
      .collection("users")
      .doc(userId)
      .collection("collection")
      .limit(20);

    q = q.where("active", "==", true);

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
