import { useFlatResult, useStore } from "components/hooks/store2/useStore";
import { useMemo } from "react";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import { Entry, GuaranteedEntry, isGuaranteed } from "types/Entry";
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
  checkInEntry: GuaranteedEntry<CheckIn>;
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
      const checkInEntry = checkInEntries.get(checkInId);
      if (!checkInEntry) {
        return null;
      }

      if (!isGuaranteed(checkInEntry)) {
        return null;
      }

      const articleId = checkInEntry.data.articleId;
      const articleEntry = articleEntries.get(articleId);
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
