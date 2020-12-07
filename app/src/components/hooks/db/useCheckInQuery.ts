import { useEffect, useMemo, useState } from "react";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import { useDB } from "../useDB";
import { useArticles } from "./useArticles";
import { useCheckIns } from "./useCheckIns";
import { Entry } from "types/Entry";

type SortOrder = {
  field: keyof CheckIn;
  dir?: string;
};

export type CheckInQuery = {
  filters: {
    userIds: string[];
    articleIds?: string[];
  };
  order?: SortOrder[];
  limit?: number;
};

type CheckInQueryResult = {
  articleEntry: Entry<Article>;
  checkInEntry: Entry<CheckIn>;
};

export function useCheckInQuery(
  query: CheckInQuery
): CheckInQueryResult[] | null {
  const [checkInIds, setCheckInIds] = useState<string[]>([]);
  const [articleIds, setArticleIds] = useState<string[]>([]);

  const db = useDB();

  useEffect(() => {
    if (query.filters.userIds.length === 0) {
      return;
    }

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
    });
  }, [db, query]);

  const articleEntries = useArticles(articleIds);
  const checkInEntries = useCheckIns(checkInIds);

  return useMemo(() => {
    if (!articleEntries || !checkInEntries) {
      return null;
    }

    const result: CheckInQueryResult[] = [];

    for (const id of checkInIds) {
      const checkInEntry = checkInEntries[id];
      if (!checkInEntry) {
        return null;
      }

      const checkIn = checkInEntry.data;
      if (!checkIn) {
        return null;
      }

      const articleEntry = articleEntries[checkIn.articleId];
      if (!articleEntry) {
        return null;
      }

      result.push({
        articleEntry,
        checkInEntry,
      });
    }

    return result;
  }, [checkInIds, articleEntries, checkInEntries]);
}
