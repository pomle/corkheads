import { useEffect, useState } from "react";
import { checkInConverter } from "types/adapters";
import { CheckIn } from "types/types";
import { useDB } from "../useDB";
import { createStoreHook } from "../createStoreHook";

export const useCheckInStore = createStoreHook<CheckIn>((db) =>
  db.collection("check-ins").withConverter(checkInConverter)
);

type SortQuery = { [key: string]: "asc" | "desc" };

type CheckInsQuery = {
  filters: {
    userIds: string[];
  };
  sort?: SortQuery;
  limit?: number;
};

export function useCheckInSearch(query: CheckInsQuery) {
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
      });
  }, [db, query]);

  return useCheckInStore(ids);
}
