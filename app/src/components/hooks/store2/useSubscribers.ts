import { useCallback, useEffect } from "react";
import { firestore } from "firebase/app";
import { Entry } from "types/Entry";

interface Cache<T> {
  get(key: string): T;
  set(key: string, value: T): void;
}

type Subscriber = {
  key: string;
  release: () => void;
  count: number;
};

const RELEASE_WAIT = 1 * 60 * 1000;

const subscribers = new Map<string, Subscriber>();

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
