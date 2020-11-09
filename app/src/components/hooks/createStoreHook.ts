import { useEffect, useMemo } from "react";
import { useObjectStore } from "components/context/ObjectStoreContext";
import { useDB } from "components/hooks/useDB";

type StoreResult<T> = {
  busy: boolean;
  data: T;
};

type CollectionFactory = (
  db: firebase.firestore.Firestore
) => firebase.firestore.CollectionReference;

export function createStoreHook<T>(getCollection: CollectionFactory) {
  return function useStore(ids: string[]): StoreResult<T[]> {
    const [store, setStore] = useObjectStore();

    const db = useDB();

    const collection = useMemo(() => {
      return getCollection(db);
    }, [db]);

    useEffect(() => {
      const unsubs: (() => void)[] = [];
      for (const id of ids) {
        const unsub = collection.doc(id).onSnapshot((snapshot) => {
          const article = snapshot.data();
          setStore((store) => ({ ...store, [id]: article }));
        });
        unsubs.push(unsub);
      }

      return () => {
        unsubs.forEach((unsub) => unsub());
      };
    }, [ids, collection, setStore]);

    const objects: T[] = [];

    let busy = false;
    for (const id of ids) {
      if (id in store) {
        objects.push(store[id] as T);
      } else {
        busy = true;
      }
    }

    return {
      busy: busy,
      data: objects,
    };
  };
}
