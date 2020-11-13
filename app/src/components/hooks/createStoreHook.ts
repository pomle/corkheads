import { useCallback, useEffect, useMemo, useState } from "react";
import { useObjectStore } from "components/context/ObjectStoreContext";
import { useDB } from "components/hooks/useDB";

const EMPTY = Object.create(null);

type Index<T> = {
  [key: string]: T;
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

  function useObjectIndex<T>(
    ids: string[]
  ): [Index<T>, (id: string, object: T) => void] {
    const [data, setData] = useState<Index<T>>(EMPTY);

    useEffect(() => {
      const index = Object.create(null);

      let commit = false;
      for (const id of ids) {
        if (id in cache) {
          if (cache[id] !== data[id]) {
            index[id] = cache[id];
            commit = true;
          }
        }
      }

      if (commit) {
        console.log("Updating data object for", tag);
        setData(index);
      }
    }, [ids, data]);

    const updateIndex = useCallback(
      (id: string, object: T) => {
        console.log("Updating index", tag, id, object);
        setData((data) => ({ ...data, [id]: object }));
      },
      [setData]
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
      const unsubs: (() => void)[] = [];
      const uniqIds = new Set<string>(ids);
      uniqIds.forEach((id) => {
        const object = { id, data: { displayName: id, manufacturer: id } };
        const timer = setTimeout(
          () => updateIndex(id, (object as unknown) as T),
          1000
        );
        const unsub = () => clearTimeout(timer);
        unsubs.push(unsub);
      });

      return () => {
        unsubs.forEach((unsub) => unsub());
      };
    }, [ids]);

    return useMemo(
      () => ({
        busy: Object.values(index).length !== ids.length,
        data: index,
      }),
      [ids, index]
    );
  };
}
