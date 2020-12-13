import { useCallback, useEffect } from "react";
import { firestore } from "firebase/app";
import { Entry } from "types/Entry";

const RELEASE_WAIT = 1 * 60 * 1000;

function calcCleanUpDelay(minMs: number) {
  const fudgeFactor = (minMs / 4) * Math.random();
  return minMs + fudgeFactor;
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
        console.debug("Subscriber release", key);
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
  set: (key: string, data: Entry<T>) => void,
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

        set(id, { id, doc });

        const unsubscribe = doc.onSnapshot((snap) => {
          const data = snap.data();

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
          },
          count: 0,
        };

        subscribers.set(key, sub);
        console.debug("Subscriber add", key);
      }

      sub.count++;
      console.debug("Subscriber inc %d", sub.count, key);
      keys.push(key);
    }

    return () => {
      const release: string[] = [];

      for (const key of keys) {
        const sub = subscribers.get(key);
        if (sub) {
          sub.count--;
          console.debug("Subscriber dec %d", sub.count, key);
          if (sub.count === 0) {
            release.push(key);
          }
        }
      }

      if (release.length > 0) {
        queueCleanUp(release);
      }
    };
  }, [ids, set, path, collection]);
}
