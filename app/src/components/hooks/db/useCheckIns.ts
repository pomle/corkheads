import { useFlatResult, useStore } from "components/hooks/createStoreHook";
import { useMemo } from "react";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import { Entry } from "types/Entry";
import { useChangeDetect } from "../useChangeDetect";
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
      console.debug("UserCheckInsView Baling: Neither");
      return null;
    }

    const result: CheckInTuple[] = [];

    for (const checkInId of checkInIds) {
      const checkInEntry = checkInEntries[checkInId];
      if (!checkInEntry) {
        console.debug(
          "UserCheckInsView Baling: Missing CheckInEntry",
          checkInId
        );
        return null;
      }

      const checkIn = checkInEntry.data;
      if (!checkIn) {
        console.debug(
          "UserCheckInsView Baling: Missing CheckIn data",
          checkInId
        );
        return null;
      }

      const articleId = checkIn.articleId;
      const articleEntry = articleEntries[articleId];
      if (!articleEntry) {
        console.debug(
          "UserCheckInsView Baling: Missing ArticleEntry",
          articleId
        );
        return null;
      }

      const article = articleEntry.data;
      if (!article) {
        console.debug(
          "UserCheckInsView Baling: Missing Article data",
          articleId
        );
        return null;
      }

      result.push({
        articleEntry,
        checkInEntry,
      });
    }

    console.debug("UserCheckInsView Not bailing:", result);

    return result;
  }, [checkInIds, articleEntries, checkInEntries]);
}
