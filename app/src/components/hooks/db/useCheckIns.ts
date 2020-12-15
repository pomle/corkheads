import {
  QueryResult,
  useSingle,
  useStore,
} from "components/hooks/store2/useStore";
import { useMemo } from "react";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import { Entry } from "types/Entry";
import { ResultMap } from "../store2/ResultMap";
import { useArticles } from "./useArticles";
import { useCollection } from "./useCollection";

export function useCheckIns(checkInIds: string[]) {
  return useStore<CheckIn>(useCollection().checkIn, checkInIds);
}

export function useCheckIn(checkInId?: string) {
  return useSingle(useCheckIns(checkInId ? [checkInId] : []), checkInId);
}

type CheckInTuple = {
  checkInEntry: Entry<CheckIn>;
  articleEntry: Entry<Article>;
};

const EMPTY: ResultMap<CheckInTuple> = new ResultMap();

export function useCheckInTuple(
  checkInIds: string[],
  articleIds: string[]
): QueryResult<CheckInTuple> {
  const checkInEntries = useCheckIns(checkInIds);
  const articleEntries = useArticles(articleIds);

  return useMemo(() => {
    const results = new ResultMap<CheckInTuple>();

    for (const checkInId of checkInIds) {
      const checkInEntry = checkInEntries.get(checkInId);
      if (!checkInEntry) {
        return {
          busy: true,
          results: EMPTY,
        };
      }

      const articleId = checkInEntry?.data?.articleId;
      const articleEntry = articleId && articleEntries.get(articleId);
      if (!articleEntry) {
        return {
          busy: true,
          results: EMPTY,
        };
      }

      results.set(checkInId, {
        articleEntry,
        checkInEntry,
      });
    }

    return {
      busy: false,
      results,
    };
  }, [checkInIds, articleEntries, checkInEntries]);
}
