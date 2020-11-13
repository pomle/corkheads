import { useCallback, useEffect, useMemo, useState } from "react";
import { useDB } from "components/hooks/useDB";

const EMPTY = Object.create(null);

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

export function createStoreHook<T>(
  getCollection: CollectionFactory,
  tag: string
) {
  const cache: { [key: string]: any } = Object.create(null);

  const subscribers: { [key: string]: Subscription } = Object.create(null);

  function useObjectIndex<T>(
    ids: string[]
  ): [Index<T>, (id: string, object: T) => void] {
    const [data, setData] = useState<Index<T>>(EMPTY);

    const refreshIndex = useCallback(() => {
      console.log("Refreshing index", tag, ids);
      const index = Object.create(null);

      let commit = false;
      for (const id of ids) {
        console.log("Checking cache for", tag, id, cache);
        if (id in cache) {
          if (cache[id]) {
            index[id] = cache[id];
            commit = true;
          }
        }
      }

      if (commit) {
        console.log("Updating data object for", tag);
        setData(index);
      }
    }, [ids]);

    useEffect(() => {
      refreshIndex();
    }, [refreshIndex]);

    const updateIndex = useCallback(
      (id: string, object: T) => {
        console.log("Updating cache", tag, id, object);
        cache[id] = object;
        refreshIndex();
      },
      [refreshIndex]
    );

    console.log("Retuning data", tag, data);

    return [data, updateIndex];
  }

  return function useStore(ids: string[]): StoreResult<T> {
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
            updateIndex(id, result.data() as T);
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

      console.log("ON", tag, subscribers);

      return () => {
        for (const sub of subs) {
          sub.count -= 1;
          if (sub.count === 0) {
            sub.unsub();
            delete subscribers[sub.id];
          }
        }

        console.log("OFF", tag, subscribers);
      };
    }, [ids, collection, updateIndex]);

    return useMemo(
      () => ({
        busy: Object.values(index).length !== ids.length,
        data: index,
      }),
      [ids, index]
    );
  };
}
