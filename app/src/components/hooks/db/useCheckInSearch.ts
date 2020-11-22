import { useEffect, useMemo, useState } from "react";
import { useDB } from "../useDB";
import { notNull, QueryResult } from "../createStoreHook";
import { CheckIn } from "types/CheckIn";
import { useCheckIns } from "./useCheckIns";
import { Container } from "types/types";

type SortQuery = { [key: string]: "asc" | "desc" };

type CheckInsQuery = {
  filters: {
    userIds: string[];
  };
  sort?: SortQuery;
  limit?: number;
};

export function useCheckInSearch(
  query: CheckInsQuery
): QueryResult<Container<CheckIn>> {
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
        setIds(ids);
        setBusy(false);
      });
  }, [db, query]);

  const checkInResult = useCheckIns(ids);

  const list = useMemo(
    () => ids.map((id) => checkInResult.data[id]).filter(notNull),
    [ids, checkInResult.data]
  );

  return useMemo(
    () => ({
      busy: busy || checkInResult.busy,
      data: list,
    }),
    [checkInResult.busy, list, busy]
  );
}
