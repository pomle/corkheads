import { useEffect, useMemo, useState } from "react";
import { Article } from "types/Article";
import { Container } from "types/types";
import { UserArticle } from "types/UserArticle";
import { notNull, QueryResult } from "../createStoreHook";
import { useDB } from "../useDB";
import { useArticles } from "./useArticles";
import { useUserArticles } from "./useUserArticles";

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
  article: Container<Article>;
  userArticle: Container<UserArticle>;
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
  const articlesResult = useArticles(ids);
  const userArticlesResult = useUserArticles(userId, ids);

  const list = useMemo(() => {
    return ids
      .map((id) => {
        const article = articlesResult.data[id];
        const userArticle = userArticlesResult.data[id];

        if (userArticle && article) {
          return {
            article,
            userArticle,
          };
        }

        return null;
      })
      .filter(notNull);
  }, [ids, userArticlesResult.data, articlesResult.data]);

  return useMemo(
    () => ({
      busy: busy || articlesResult.busy || userArticlesResult.busy,
      data: list,
    }),
    [articlesResult.busy, userArticlesResult.busy, list, busy]
  );
}
