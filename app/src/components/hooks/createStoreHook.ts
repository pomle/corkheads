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
  return {
    busy: result.busy,
    data: id in result.data ? result.data[id] : null,
  };
}

export function useStore<T>(
  collection: firestore.CollectionReference<T>,
  unstableIds: string[]
): StoreResult<Container<T>> {
  const ids = useEqualList(unstableIds);

  const [index, updateIndex] = useObjectIndex<Container<T> | null>(
    ids,
    collection.path
  );

  useEffect(() => {
    const unsubs = ids.map((id) =>
      collection.doc(id).onSnapshot((snap) => {
        updateIndex(id, toContainer<T>(snap));
      })
    );

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [ids, collection, updateIndex]);

  return useMemo(
    () => ({
      busy: !ids.every((id) => id in index),
      data: index,
    }),
    [ids, index]
  );
}
