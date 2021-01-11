import { useEffect, useMemo, useState } from "react";
import { QueryRequest } from "../store2/useStore";
import { useDB } from "../useDB";

type SortFields = "displayName";

type SortOrder = {
  field: SortFields;
  dir?: string;
};

export type ArticleQuery = {
  filters: {
    creatorUserIds: string[];
  };
  order?: SortOrder[];
  limit?: number;
};

export type ArticlePointer = {
  articleId: string;
};

export function useArticleQuery(
  query: ArticleQuery
): QueryRequest<ArticlePointer> {
  const [results, setResults] = useState<ArticlePointer[]>([]);

  const db = useDB();

  useEffect(() => {
    let q = db.collection("articles").limit(20);

    if (query.filters) {
      const filters = query.filters;
      if (filters.creatorUserIds !== undefined) {
        console.log(filters);
        q = q.where("userId", "in", filters.creatorUserIds);
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
