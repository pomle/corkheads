import { useFlatResult, useStore } from "components/hooks/useStore";
import { useMemo } from "react";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import { Entry } from "types/Entry";
import { useArticles } from "./useArticles";
import { useCollection } from "./useCollection";

export function useCheckIns(checkInIds: string[]) {
  return useStore<CheckIn>(useCollection().checkIn, checkInIds);
}

export function useCheckIn(checkInId: string) {
  const result = useCheckIns([checkInId]);
  return useFlatResult(checkInId, result);
}

type CheckInTuple = {
  checkInEntry: Entry<CheckIn>;
  articleEntry: Entry<Article>;
};

export function useCheckInTuple(
  checkInIds: string[],
  articleIds: string[]
): CheckInTuple[] | null {
  const checkInEntries = useCheckIns(checkInIds);
  const articleEntries = useArticles(articleIds);

  return useMemo(() => {
    if (!articleEntries || !checkInEntries) {
      return null;
    }

    const result: CheckInTuple[] = [];

    for (const checkInId of checkInIds) {
      const checkInEntry = checkInEntries[checkInId];
      if (!checkInEntry) {
        return null;
      }

      const checkIn = checkInEntry.data;
      if (!checkIn) {
        return null;
      }

      const articleId = checkIn.articleId;
      const articleEntry = articleEntries[articleId];
      if (!articleEntry) {
        return null;
      }

      const article = articleEntry.data;
      if (!article) {
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
