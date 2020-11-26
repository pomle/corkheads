import { useCallback, useEffect, useMemo, useRef } from "react";
import { firestore } from "firebase/app";
import { useObjectStore } from "components/context/ObjectStoreContext";
import { listEquals } from "lib/equality";
import { Entry } from "types/Entry";

type Index<T> = Record<string, T>;

export type StoreResult<T> = Index<Entry<T>> | null;
export type QueryResult<T> = Entry<T>[] | null;

function useEqualList(next: any[]): any[] {
  const memo = useRef<any[]>([]);

  const prev = memo.current;
  if (!listEquals(next, prev)) {
    memo.current = next;
  }

  return memo.current;
}

export function useFlatResult<T>(id: string, result: StoreResult<T>) {
  return result ? result[id] : null;
}

const EMPTY = Object.create(null);

export function useObjectIndex<T>(
  ids: string[],
  namespace: string
): [Record<string, unknown>, (id: string, object: T) => void] {
  const [store, setStore] = useObjectStore();

  const path = useCallback((id: string) => `${namespace}/${id}`, [namespace]);

  const updateStore = useCallback(
    (id: string, object: T) => {
      const key = path(id);
      setStore((store) => ({ ...store, [key]: object }));
    },
    [path, setStore]
  );

  const index = useRef<Record<string, T>>(EMPTY);

  const data = useMemo(() => {
    const newIndex = Object.create(null);
    let updateIndex = false;

    for (const id of ids) {
      const key = path(id);
      if (key in store) {
        newIndex[id] = store[key];
        if (newIndex[id] !== index.current[id]) {
          updateIndex = true;
        }
      }
    }

    if (updateIndex) {
      index.current = newIndex;
    }

    return index.current;
  }, [path, ids, store]);

  return [data, updateStore];
}

type Subscriber = {
  key: string;
  unsub: () => void;
  count: number;
};

function createStore() {
  const subscribers: Index<Subscriber> = Object.create(null);

  return function useStore<T>(
    collection: firestore.CollectionReference<T>,
    unstableIds: string[]
  ): StoreResult<T> {
    const ids = useEqualList(unstableIds);

    const [index, updateIndex] = useObjectIndex<T | null>(ids, collection.path);

    const cache = useRef<Index<Entry<T>>>(EMPTY);

    useEffect(() => {
      if (ids.length === 0) {
        return;
      }

      const keys: string[] = [];
      for (const id of ids) {
        const doc = collection.doc(id);
        const key = doc.path;
        if (!subscribers[key]) {
          subscribers[key] = {
            key,
            unsub: doc.onSnapshot((snap) => {
              updateIndex(id, snap.data() || null);
            }),
            count: 0,
          };
        }

        subscribers[key].count++;
        keys.push(key);
      }

      return () => {
        for (const key of keys) {
          const sub = subscribers[key];
          sub.count--;
          if (sub.count === 0) {
            sub.unsub();
            delete subscribers[key];
          }
        }
      };
    }, [ids, collection, updateIndex]);

    return useMemo(() => {
      const entries: Index<Entry<T>> = Object.create(null);
      let updateCache = false;

      for (const id of ids) {
        if (!(id in index)) {
          return null;
        }

        entries[id] = cache.current[id] || {
          id,
          doc: collection.doc(id),
        };

        if (entries[id].data !== index[id]) {
          entries[id].data = index[id] as T | null;
          if (entries[id].data !== cache.current[id]?.data) {
            updateCache = true;
          }
        }
      }

      if (updateCache) {
        cache.current = entries;
      }

      return cache.current;
    }, [ids, index, collection]);
  };
}

export const useStore = createStore();
