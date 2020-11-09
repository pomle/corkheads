import { useEffect, useMemo, useState } from "react";
import { checkInConverter } from "types/adapters";
import { CheckIn } from "types/types";
import { useDB } from "../useDB";
import { useObjectStore } from "components/context/ObjectStoreContext";

type QueryResult<T> = {
  busy: boolean;
  data: T;
};

export function useCheckInStore(ids: string[]): QueryResult<CheckIn[]> {
  const [store, setStore] = useObjectStore();

  const db = useDB();

  const collection = useMemo(() => {
    return db.collection("check-ins").withConverter(checkInConverter);
  }, [db]);

  useEffect(() => {
    const unsubs: (() => void)[] = [];
    for (const id of ids) {
      const unsub = collection.doc(id).onSnapshot((snapshot) => {
        const checkIn = snapshot.data();
        setStore((store) => ({ ...store, [id]: checkIn }));
      });
      unsubs.push(unsub);
    }

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [ids, collection, setStore]);

  const checkIns: CheckIn[] = [];

  let busy = false;
  for (const id of ids) {
    if (id in store) {
      checkIns.push(store[id] as CheckIn);
    } else {
      busy = true;
    }
  }

  return {
    busy: busy,
    data: checkIns,
  };
}

type CheckInsQuery = {
  filters: {
    userIds: string[];
  };
};

export function useCheckInSearch(query: CheckInsQuery): QueryResult<CheckIn[]> {
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
      .onSnapshot((result) => {
        const ids = result.docs.map((doc) => doc.id);
        setIds(ids);
      });
  }, [db, query]);

  return useCheckInStore(ids);
}
