import { useCallback, useEffect, useMemo, useRef } from "react";
import { useDB } from "components/hooks/useDB";
import { useObjectStore } from "components/context/ObjectStoreContext";

type Index<T> = {
  [key: string]: T;
};

type Subscription = {
  id: string;
  count: number;
  unsub: () => void;
};

type StoreResult<T> = {
  busy: boolean;
  data: Index<T>;
};

type CollectionFactory = (
  db: firebase.firestore.Firestore
) => firebase.firestore.CollectionReference;

function useEqualList(next: any[]): any[] {
  const memo = useRef<any[]>([]);

  const prev = memo.current;
  if (next.length !== prev.length) {
    memo.current = next;
    return memo.current;
  }

  for (let i = 0; i < next.length; i += 1) {
    if (next[i] !== prev[i]) {
      memo.current = next;
      return memo.current;
    }
  }

  return memo.current;
}

export function createStoreHook<T>(getCollection: CollectionFactory) {
  function useObjectIndex<T>(
    ids: string[]
  ): [Index<T>, (id: string, object: T) => void] {
    const [store, setStore] = useObjectStore();

    const updateIndex = useCallback(
      (id: string, object: T) => {
        setStore((store) => ({ ...store, [id]: object }));
      },
      [setStore]
    );

    const data = useMemo(() => {
      const index = Object.create(null);

      for (const id of ids) {
        if (store[id]) {
          index[id] = store[id];
        }
      }

      return index;
    }, [ids, store]);

    return [data, updateIndex];
  }

  const subscribers: { [key: string]: Subscription } = Object.create(null);

  return function useStore(unstableIds: string[]): StoreResult<T> {
    const ids = useEqualList(unstableIds);
    const [index, updateIndex] = useObjectIndex<T>(ids);

    const db = useDB();

    const collection = useMemo(() => {
      return getCollection(db);
    }, [db]);

    useEffect(() => {
      const subs: Subscription[] = [];
      for (const id of ids) {
        let sub: Subscription;

        if (!subscribers[id]) {
          const unsub = collection.doc(id).onSnapshot((result) => {
            const data = result.data() as T;
            updateIndex(id, data);
          });

          subscribers[id] = {
            id,
            count: 0,
            unsub,
          };
        }

        sub = subscribers[id];
        sub.count += 1;
        subs.push(sub);
      }

      return () => {
        for (const sub of subs) {
          sub.count -= 1;
          if (sub.count === 0) {
            sub.unsub();
            delete subscribers[sub.id];
          }
        }
      };
    }, [ids, collection, updateIndex]);

    return useMemo(
      () => ({
        busy: !ids.every((id) => index[id]),
        data: index,
      }),
      [ids, index]
    );
  };
}

export function toList<T>(ids: string[], index: { [key: string]: T }) {
  return ids.filter((id) => index[id]).map((id) => index[id]);
}
