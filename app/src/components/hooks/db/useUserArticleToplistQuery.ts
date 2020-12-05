import { useMemo } from "react";
import { UserArticleQuery, useUserArticleQuery } from "./useUserArticleQuery";

export function useUserArticleToplistQuery(userId: string, limit: number) {
  const query = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [
        {
          field: "rating.score",
          dir: "desc",
        },
        {
          field: "checkIns",
          dir: "desc",
        },
      ],
      limit,
    };
  }, [userId, limit]);

  return useUserArticleQuery(query);
}
