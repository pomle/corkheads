import { useEffect, useState } from "react";
import { UserWishlistArticle } from "types/UserWishlistArticle";
import { useDB } from "../useDB";
import { useUserArticleTuple } from "./useUserArticles";

type SortOrder = {
  field: keyof UserWishlistArticle;
  dir?: string;
};

export type UserWishlistArticleQuery = {
  filters: {
    userId: string;
    owner?: boolean;
    wishlist?: boolean;
  };
  order?: SortOrder[];
  limit?: number;
};

export function useUserWishlistArticleQuery(query: UserWishlistArticleQuery) {
  const [ids, setIds] = useState<string[]>([]);

  const db = useDB();

  useEffect(() => {
    const userId = query.filters.userId;

    let q = db.collection("users").doc(userId).collection("wishlist").limit(20);

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
  return useUserArticleTuple(ids, userId);
}
