import { useEffect, useState } from "react";
import { UserArticle } from "types/UserArticle";
import { useDB } from "../useDB";
import { useUserArticleTuple } from "./useUserArticles";

type SortOrder = {
  field: keyof UserArticle;
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

export function useUserArticleQuery(query: UserArticleQuery) {
  const [ids, setIds] = useState<string[]>([]);

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
      const ids = result.docs.map((doc) => doc.id);
      setIds(ids);
    });
  }, [db, query]);

  const userId = query.filters.userId;
  return useUserArticleTuple(userId, ids);
}
