import { useCallback, useEffect, useMemo, useRef } from "react";
import { firestore } from "firebase/app";
import { listEquals } from "lib/equality";
import { Entry } from "types/Entry";
import { useStableIndex } from "./store2/useStableIndex";
import { debounce } from "lib/debounce";
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

const RELEASE_WAIT = 1 * 60 * 1000;

function createStore() {
  const subscribers = new Map<string, Subscriber>();

  return function useStore<T>(
    collection: firestore.CollectionReference<T>,
    unstableIds: string[]
  ): StoreResult<T> {
    const ids = useEqualList(unstableIds);

    const { counter, index: store, update } = useFirebaseStore();

    console.log("Cache counter", collection.path, counter);

    const path = useCallback((id: string) => `${collection.path}/${id}`, [
      collection,
    ]);

    useMemo(() => {
      for (const id of ids) {
        const key = path(id);
        if (!store.has(key)) {
          store.set(key, {
            id,
            doc: collection.doc(id),
          });
        }
      }
    }, [store, path, collection, ids]);

    const get = useCallback(
      (id: string) => {
        const key = path(id);
        return store.get(key) as Entry<T>;
      },
      [path, store]
    );

    const set = useMemo(() => {
      const buffer: [string, Entry<T>][] = [];

      const flush = debounce(() => {
        console.log("Flushing to cache", buffer);
        update([...buffer]);
        buffer.length = 0;
      }, 250);

      return (id: string, data: Entry<T>) => {
        const key = path(id);
        buffer.push([key, data]);
        flush();
      };
    }, [path, update]);

    useEffect(() => {
      if (ids.length === 0) {
        return;
      }

      const keys: string[] = [];
      for (const id of ids) {
        const key = path(id);

        let sub = subscribers.get(key);
        if (!sub) {
          const { doc } = store.get(key) as Entry<T>;

          const unsubscribe = doc.onSnapshot((snap) => {
            const data = snap.data();
            console.log("UserCheckInsView Setting", key, "with data", !!data);

            set(id, {
              id,
              doc,
              data,
            });
          });

          sub = {
            key,
            release: () => {
              unsubscribe();
              //index.delete(id);
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
    }, [ids, set, path, store]);

    return useStableIndex(ids, get, counter);
  };
}

export const useStore = createStore();
