import { useCallback, useEffect, useMemo, useRef } from "react";
import { firestore } from "firebase/app";
import { listEquals } from "lib/equality";
import { Entry } from "types/Entry";
import { useStableIndex } from "./store2/useStableIndex";
import { useFirebaseStore } from "components/context/FirebaseStore";

type Index<T> = Record<string, T>;

export type StoreResult<T> = Index<Entry<T>> | null;
export type QueryResult<T> = Entry<T>[] | null;

function useEqualList<T>(next: T[]): T[] {
  const memo = useRef<T[]>([]);

  const prev = memo.current;
  if (!listEquals(next, prev)) {
    memo.current = next;
  }

  return memo.current;
}

export function useFlatResult<T>(id: string, result: StoreResult<T>) {
  return result ? result[id] : null;
}

type Subscriber = {
  key: string;
  release: () => void;
  count: number;
};

interface Cache<T> {
  get(key: string): T;
  set(key: string, value: T): void;
}

function useIndex<T>(path: (id: string) => string) {
  const { store, queue } = useFirebaseStore();

  return useMemo(
    () => ({
      get(id: string): T | undefined {
        const key = path(id);
        return store[key] as T | undefined;
      },
      set(id: string, data: T) {
        const key = path(id);
        queue(key, data);
      },
    }),
    [store, queue, path]
  );
}

const RELEASE_WAIT = 1 * 60 * 1000;

const subscribers = new Map<string, Subscriber>();

function useSubscribers<T>(
  collection: firestore.CollectionReference<T>,
  cache: Cache<Entry<T> | undefined>,
  ids: string[]
) {
  const path = useCallback((id: string) => `${collection.path}/${id}`, [
    collection,
  ]);

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const keys: string[] = [];
    for (const id of ids) {
      const key = path(id);

      let sub = subscribers.get(key);
      if (!sub) {
        const doc = collection.doc(id);
        const unsubscribe = doc.onSnapshot((snap) => {
          const data = snap.data();

          cache.set(id, {
            id,
            doc,
            data,
          });
        });

        sub = {
          key,
          release: () => {
            unsubscribe();
          },
          count: 0,
        };

        subscribers.set(key, sub);
        console.debug("Subscriber added", key);
      }

      sub.count++;
      console.debug("Sub count +", sub.count, key);
      keys.push(key);
    }

    return () => {
      const releaseCandidates: string[] = [];
      for (const key of keys) {
        const sub = subscribers.get(key);
        if (sub) {
          sub.count--;
          console.debug("Sub count -", sub.count, key);
          if (sub.count === 0) {
            releaseCandidates.push(key);
          }
        }
      }

      if (releaseCandidates.length > 0) {
        const maybeUnsub = () => {
          for (const key of releaseCandidates) {
            const sub = subscribers.get(key);
            if (sub && sub.count === 0) {
              sub.release();
              subscribers.delete(key);
              console.debug("Subscriber deleted", key);
            }
          }
        };

        const delay = RELEASE_WAIT + Math.random() * 60000;
        console.debug("Scheduling clean up", delay, releaseCandidates);
        setTimeout(maybeUnsub, delay);
      }
    };
  }, [ids, cache, path, collection]);
}

export function useStore<T>(
  collection: firestore.CollectionReference<T>,
  unstableIds: string[]
): StoreResult<T> {
  const ids = useEqualList(unstableIds);

  const path = useCallback((id: string) => `${collection.path}/${id}`, [
    collection,
  ]);

  const index = useIndex<Entry<T>>(path);

  useSubscribers(collection, index, ids);

  return useStableIndex<Entry<T>>(ids, index);
}
