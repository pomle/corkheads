import { useCallback, useEffect } from "react";
import { firestore } from "firebase/app";
import { Entry } from "types/Entry";

const RELEASE_WAIT = 1 * 60 * 1000;

function calcCleanUpDelay(minMs: number) {
  const fudgeFactor = (minMs / 4) * Math.random();
  return minMs + fudgeFactor;
}

interface Cache<T> {
  get(key: string): T;
  set(key: string, value: T): void;
}

type Subscriber = {
  key: string;
  release: () => void;
  count: number;
};

const subscribers = new Map<string, Subscriber>();

function queueCleanUp(keys: string[]) {
  const maybeUnsub = () => {
    for (const key of keys) {
      const sub = subscribers.get(key);
      if (sub && sub.count === 0) {
        sub.release();
        console.debug("Subscriber released", key);
        subscribers.delete(key);
      }
    }
  };

  const delay = calcCleanUpDelay(RELEASE_WAIT);
  console.debug("Scheduling clean up in %dms for %d keys", delay, keys.length);
  setTimeout(maybeUnsub, delay);
}

export function useSubscribers<T>(
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
      keys.push(key);
    }

    return () => {
      const release: string[] = [];

      for (const key of keys) {
        const sub = subscribers.get(key);
        if (sub) {
          sub.count--;
          if (sub.count === 0) {
            release.push(key);
          }
        }
      }

      if (release.length > 0) {
        queueCleanUp(release);
      }
    };
  }, [ids, cache, path, collection]);
}
