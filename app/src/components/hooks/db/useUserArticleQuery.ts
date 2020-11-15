import { useEffect, useMemo, useState } from "react";
import { Article } from "types/article";
import { UserArticle } from "types/userArticle";
import { QueryResult } from "../createStoreHook";
import { useDB } from "../useDB";
import { useArticleStore } from "./useArticles";
import { useUserArticleStore } from "./useUserArticles";

type UserArticleQuery = {
  filters: {
    userId: string;
  };
  limit: number;
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

    return db
      .collection("users")
      .doc(userId)
      .collection("articles")
      .orderBy("checkIns", "desc")
      .limit(query.limit)
      .onSnapshot((result) => {
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
