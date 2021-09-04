import { useEffect, useMemo, useState } from "react";
import { UserArticle } from "types/UserArticle";
import { QueryRequest } from "./types";
import { useDB } from "../useDB";

type SortFields =
  | "collection.addedTimestamp"
  | "rating.love"
  | "rating.score"
  | "wishlist.addedTimestamp"
  | keyof UserArticle;

type SortOrder = {
  field: SortFields;
  dir?: string;
};

export type UserArticleQuery = {
  filters: {
    userId: string;
    collection?: boolean;
    wishlist?: boolean;
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

    if (query.filters) {
      const filters = query.filters;
      if (filters.collection !== undefined) {
        q = q.where("collection.active", "==", filters.collection);
      }

      if (filters.wishlist !== undefined) {
        q = q.where("wishlist.active", "==", filters.wishlist);
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
