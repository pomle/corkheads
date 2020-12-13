import { firestore } from "firebase/app";
import { Entry } from "types/Entry";
import { useStableIndex } from "./useStableIndex";
import { useSubscribers } from "./useSubscribers";
import { useEqualList } from "./useEqualList";
import { useIndex } from "./useIndex";
import { usePath } from "./usePath";
import { ResultMap } from "./ResultMap";

export type StoreResult<T> = ResultMap<Entry<T>>;
export type QueryResult<T> = Entry<T>[] | null;

export function useFlatResult<T>(id: string, result: StoreResult<T>) {
  return result ? result.get(id) : null;
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
