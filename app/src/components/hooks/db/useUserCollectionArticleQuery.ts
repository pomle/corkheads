import { useEffect, useState } from "react";
import { UserCollectionArticle } from "types/UserCollectionArticle";
import { useDB } from "../useDB";
import { useUserArticleTuple } from "./useUserArticles";

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

export function useUserCollectionArticleQuery(
  query: UserCollectionArticleQuery
) {
  const [ids, setIds] = useState<string[]>([]);

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
      const ids = result.docs.map((doc) => doc.id);
      setIds(ids);
    });
  }, [db, query]);

  const userId = query.filters.userId;
  return useUserArticleTuple(userId, ids);
}
