import { useEffect, useMemo, useState } from "react";
import { Article } from "types/article";
import { UserArticle } from "types/userArticle";
import { QueryResult } from "../createStoreHook";
import { useDB } from "../useDB";
import { useArticleStore } from "./useArticles";
import { useUserArticleStore } from "./useUserArticles";

type SortOrder = {
  field: string;
  dir?: string;
};

type UserArticleQuery = {
  filters: {
    userId: string;
    owner?: boolean;
    wishlist?: boolean;
  };
  order?: SortOrder[];
  limit?: number;
};

export function useUserArticleQuery(
  query: UserArticleQuery
): QueryResult<{
  article: Article;
  userArticle: UserArticle;
}> {
  const [busy, setBusy] = useState<boolean>(true);
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
      setBusy(false);
    });
  }, [db, query]);

  const userId = query.filters.userId;
  const articlesResult = useArticleStore(ids);
  const userArticlesResult = useUserArticleStore(userId, ids);

  const list = useMemo(() => {
    const u = userArticlesResult.data;
    const a = articlesResult.data;
    return ids
      .filter((id) => {
        return u[id] && a[id];
      })
      .map((id) => {
        return {
          userArticle: u[id],
          article: a[id],
        };
      });
  }, [ids, userArticlesResult.data, articlesResult.data]);

  return useMemo(
    () => ({
      busy: busy || articlesResult.busy || userArticlesResult.busy,
      data: list,
    }),
    [articlesResult.busy, userArticlesResult.busy, list, busy]
  );
}
