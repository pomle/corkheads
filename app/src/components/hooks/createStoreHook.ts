import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { firestore } from "firebase/app";
import { listEquals } from "lib/equality";
import { Entry } from "types/Entry";
import { useStableIndex } from "./store2/useStableIndex";
import { debounce } from "lib/debounce";

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

function useBump(tag: string): [number, (tag: string) => void] {
  const [cycle, setCycle] = useState<number>(0);
  const bump = useMemo(() => {
    const increment = (tag: string) => {
      setCycle((cycle) => {
        const next = cycle + 1;
        console.debug("Bumping cache", tag, next);
        return next;
      });
    };
    const thottled = debounce(increment, 100);
    return (tag: string) => {
      console.log("Queueing ping", tag);
      thottled(tag);
    };
  }, [tag]);

  return [cycle, bump];
}

type Subscriber = {
  key: string;
  release: () => void;
  count: number;
};

const RELEASE_WAIT = 1 * 60 * 1000;

function createIndex<T>(
  store: Map<string, unknown>,
  key: (id: string) => string
) {
  return {
    delete(id: string) {
      store.delete(key(id));
    },
    has(id: string) {
      return store.has(key(id));
    },
    get(id: string): T {
      return store.get(key(id)) as T;
    },
    set(id: string, data: T) {
      store.set(key(id), data);
    },
  };
}

function createStore() {
  const subscribers = new Map<string, Subscriber>();
  const store = new Map<string, Entry<unknown>>();

  return function useStore<T>(
    collection: firestore.CollectionReference<T>,
    unstableIds: string[]
  ): StoreResult<T> {
    const ids = useEqualList(unstableIds);

    const [cacheCycle, pingCache] = useBump(collection.path);

    const createKey = useCallback((id: string) => `${collection.path}/${id}`, [
      collection,
    ]);

    const index = useMemo(() => {
      const index = createIndex<Entry<T>>(store, createKey);

      for (const id of ids) {
        if (!index.has(id)) {
          const doc = collection.doc(id);
          index.set(id, { id, doc });
        }
      }

      return index;
    }, [ids, collection, createKey]);

    useEffect(() => {
      if (ids.length === 0) {
        return;
      }

      const keys: string[] = [];
      for (const id of ids) {
        const key = createKey(id);

        let sub = subscribers.get(key);
        if (!sub) {
          const { doc } = index.get(id) as Entry<T>;

          const unsubscribe = doc.onSnapshot((snap) => {
            const data = snap.data();
            console.log("UserCheckInsView Setting", key, "with data", !!data);

            index.set(id, {
              id,
              doc,
              data,
            });

            pingCache(`UserCheckInsView Ping ${key}`);
          });

          sub = {
            key,
            release: () => {
              unsubscribe();
              index.delete(id);
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
    }, [ids, index, createKey, pingCache]);

    return useStableIndex(ids, index, cacheCycle);
  };
}

export const useStore = createStore();
