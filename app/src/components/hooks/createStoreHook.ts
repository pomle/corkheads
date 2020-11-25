import { useEffect, useMemo, useRef } from "react";
import { firestore } from "firebase/app";
import { useObjectIndex } from "components/context/ObjectStoreContext";
import { listEquals } from "lib/equality";
import { Container, toContainer } from "types/Container";

type Index<T> = Record<string, T>;

export type StoreResult<T> = {
  busy: boolean;
  data: Index<T | null>;
};

export type QueryResult<T> = {
  busy: boolean;
  data: T[];
};

function useEqualList(next: any[]): any[] {
  const memo = useRef<any[]>([]);

  const prev = memo.current;
  if (!listEquals(next, prev)) {
    memo.current = next;
  }

  return memo.current;
}

export function notNull<T>(value: T | null): value is T {
  return !!value;
}

export function toList<T>(ids: string[], index: Record<string, T | null>): T[] {
  return ids.map((id) => index[id]).filter(notNull);
}

export function useFlatResult<T>(id: string, result: StoreResult<T>) {
  const data = id in result.data ? result.data[id] : null;
  return useMemo(
    () => ({
      busy: result.busy,
      data,
    }),
    [result.busy, data]
  );
}

type Subscriber = {
  key: string;
  unsub: () => void;
  count: number;
};

function createStore() {
  const subscribers: Record<string, Subscriber> = Object.create(null);

  return function useStore<T>(
    collection: firestore.CollectionReference<T>,
    unstableIds: string[]
  ): StoreResult<Container<T>> {
    const ids = useEqualList(unstableIds);

    const [index, updateIndex] = useObjectIndex<Container<T> | null>(
      ids,
      collection.path
    );

    useEffect(() => {
      const subs: Subscriber[] = [];
      for (const id of ids) {
        const doc = collection.doc(id);
        const key = doc.path;
        if (!subscribers[key]) {
          subscribers[key] = {
            key,
            unsub: doc.onSnapshot((snap) => {
              updateIndex(id, toContainer<T>(snap));
            }),
            count: 0,
          };
          console.log("Subscriber Created", key);
        }

        subscribers[key].count++;
        subs.push(subscribers[key]);
      }

      return () => {
        for (const sub of subs) {
          const p = subscribers[sub.key];
          p.count--;
          if (p.count === 0) {
            p.unsub();
            delete subscribers[sub.key];
            console.log("Subscriber Deleted", sub.key);
          }
        }
      };
    }, [ids, collection, updateIndex]);

    return useMemo(() => {
      return {
        busy: !ids.every((id) => id in index),
        data: index,
      };
    }, [ids, index]);
  };
}

export const useStore = createStore();
