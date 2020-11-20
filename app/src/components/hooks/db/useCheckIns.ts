import { useEffect, useMemo, useState } from "react";
import { useDB } from "../useDB";
import {
  createStoreHook,
  QueryResult,
  toList,
  useFlatResult,
} from "../createStoreHook";
import { converter, CheckIn } from "types/checkIn";

export function useCheckInCollection() {
  const db = useDB();
  return useMemo(() => db.collection("check-ins").withConverter(converter), [
    db,
  ]);
}

export const useCheckInStore = createStoreHook<CheckIn>(useCheckInCollection);

export function useCheckIn(checkInId: string) {
  const result = useCheckInStore([checkInId]);
  return useFlatResult(checkInId, result);
}

type SortQuery = { [key: string]: "asc" | "desc" };

type CheckInsQuery = {
  filters: {
    userIds: string[];
  };
  sort?: SortQuery;
  limit?: number;
};

export function useCheckInSearch(query: CheckInsQuery): QueryResult<CheckIn> {
  const [busy, setBusy] = useState<boolean>(true);
  const [ids, setIds] = useState<string[]>([]);

  const db = useDB();

  useEffect(() => {
    if (query.filters.userIds.length === 0) {
      return;
    }

    const userId = query.filters.userIds[0];

    return db
      .collection("users")
      .doc(userId)
      .collection("check-ins")
      .orderBy("createdAt", "desc")
      .limit(query.limit || 10)
      .onSnapshot((result) => {
        const ids = result.docs.map((doc) => doc.id);
        console.log("Updating search ids");
        setIds(ids);
        setBusy(false);
      });
  }, [db, query]);

  const checkInResult = useCheckInStore(ids);

  const list = useMemo(() => toList(ids, checkInResult.data), [
    ids,
    checkInResult.data,
  ]);

  return useMemo(
    () => ({
      busy: busy || checkInResult.busy,
      data: list,
    }),
    [checkInResult.busy, list, busy]
  );
}
