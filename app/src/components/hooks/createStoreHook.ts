import { firestore } from "firebase/app";
import { Entry } from "types/Entry";
import { useStableIndex } from "./store2/useStableIndex";
import { useSubscribers } from "./store2/useSubscribers";
import { useEqualList } from "./store2/useEqualList";
import { useIndex } from "./store2/useIndex";
import { usePath } from "./store2/usePath";

export type StoreResult<T> = Record<string, Entry<T>> | null;
export type QueryResult<T> = Entry<T>[] | null;

export function useFlatResult<T>(id: string, result: StoreResult<T>) {
  return result ? result[id] : null;
}

export function useStore<T>(
  collection: firestore.CollectionReference<T>,
  unstableIds: string[]
): StoreResult<T> {
  const ids = useEqualList(unstableIds);

  const path = usePath(collection);

  const index = useIndex<Entry<T>>(path);

  useSubscribers(collection, index, ids);

  return useStableIndex<Entry<T>>(ids, index);
}
