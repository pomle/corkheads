import { useEffect, useMemo, useState } from "react";
import { Article } from "types/Article";
import { Entry } from "types/Entry";
import { UserArticle } from "types/UserArticle";
import { useDB } from "../useDB";
import { useArticles } from "./useArticles";
import { useUserArticles } from "./useUserArticles";

type SortOrder = {
  field: keyof UserArticle;
  dir?: string;
};

export type UserArticleQuery = {
  filters: {
    userId: string;
    owner?: boolean;
    wishlist?: boolean;
  };
  order?: SortOrder[];
  limit?: number;
};

type UserArticleQueryResult = {
  articleEntry: Entry<Article>;
  userArticleEntry: Entry<UserArticle>;
};

export function useUserArticleQuery(
  query: UserArticleQuery
): UserArticleQueryResult[] | null {
  const [ids, setIds] = useState<string[]>([]);

  const db = useDB();

  useEffect(() => {
    const userId = query.filters.userId;

    let q = db.collection("users").doc(userId).collection("articles").limit(20);

    if (query.filters.owner !== undefined) {
      q = q.where("owner", "==", query.filters.owner);
    }

    if (query.filters.wishlist !== undefined) {
      q = q.where("tryIt", "==", query.filters.wishlist);
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
  const articleEntries = useArticles(ids);
  const userArticleEntries = useUserArticles(userId, ids);

  return useMemo(() => {
    if (!articleEntries || !userArticleEntries) {
      return null;
    }

    const results: UserArticleQueryResult[] = [];

    for (const id of ids) {
      const articleEntry = articleEntries[id];
      const userArticleEntry = userArticleEntries[id];

      if (!articleEntry || !userArticleEntry) {
        return null;
      }

      results.push({
        articleEntry,
        userArticleEntry,
      });
    }

    return results;
  }, [ids, articleEntries, userArticleEntries]);
}
