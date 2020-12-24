import { useEffect, useState } from "react";
import { CheckIn } from "types/CheckIn";
import { useDB } from "../useDB";
import { useCheckInTuple } from "./useCheckIns";

type SortOrder = {
  field: keyof CheckIn;
  dir?: string;
};

export type CheckInQuery = {
  filters?: {
    userIds?: string[];
    articleIds?: string[];
  };
  order?: SortOrder[];
  limit?: number;
};

export function useCheckInQuery(query: CheckInQuery) {
  const [checkInIds, setCheckInIds] = useState<string[]>([]);
  const [articleIds, setArticleIds] = useState<string[]>([]);

  const db = useDB();

  useEffect(() => {
    let q = db.collection("check-ins").limit(10);

    if (query.filters) {
      const filters = query.filters;
      if (filters.userIds) {
        q = q.where("userId", "in", query.filters.userIds);
      }

      if (filters.articleIds) {
        q = q.where("articleId", "in", query.filters.articleIds);
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

  return useCheckInTuple(checkInIds, articleIds);
}
