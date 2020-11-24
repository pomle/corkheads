import { useEffect, useMemo, useState } from "react";
import { Article } from "types/Article";
import { Container } from "types/Container";
import { CheckIn } from "types/CheckIn";
import { notNull, QueryResult } from "../createStoreHook";
import { useDB } from "../useDB";
import { useArticles } from "./useArticles";
import { useCheckIns } from "./useCheckIns";

type SortOrder = {
  field: keyof CheckIn;
  dir?: string;
};

export type CheckInQuery = {
  filters: {
    userIds: string[];
    articleIds?: string[];
    owner?: boolean;
    wishlist?: boolean;
  };
  order?: SortOrder[];
  limit?: number;
};

export function useCheckInQuery(
  query: CheckInQuery
): QueryResult<{
  article: Container<Article>;
  checkIn: Container<CheckIn>;
}> {
  const [busy, setBusy] = useState<boolean>(true);
  const [checkInIds, setCheckInIds] = useState<string[]>([]);
  const [articleIds, setArticleIds] = useState<string[]>([]);

  const db = useDB();

  useEffect(() => {
    if (query.filters.userIds.length === 0) {
      return;
    }

    setBusy(true);

    const userId = query.filters.userIds[0];

    let q = db.collection("check-ins").where("userId", "==", userId);

    if (query.filters.articleIds) {
      q = q.where("articleId", "in", query.filters.articleIds);
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
      const articleIds: string[] = [];
      const checkInIds: string[] = [];

      for (const doc of result.docs) {
        const data = doc.data();
        if (data) {
          checkInIds.push(doc.id);
          articleIds.push(data.articleId as string);
        }
      }

      setArticleIds(articleIds);
      setCheckInIds(checkInIds);

      setBusy(false);
    });
  }, [db, query]);

  const articlesResult = useArticles(articleIds);
  const checkInsResult = useCheckIns(checkInIds);

  const list = useMemo(() => {
    return checkInIds
      .map((id) => {
        const checkIn = checkInsResult.data[id];
        if (!checkIn) {
          return null;
        }

        const article = articlesResult.data[checkIn.data.articleId];
        if (!article) {
          return null;
        }

        return {
          article,
          checkIn,
        };
      })
      .filter(notNull);
  }, [checkInIds, checkInsResult.data, articlesResult.data]);

  return useMemo(
    () => ({
      busy: busy || articlesResult.busy || checkInsResult.busy,
      data: list,
    }),
    [articlesResult.busy, checkInsResult.busy, list, busy]
  );
}
