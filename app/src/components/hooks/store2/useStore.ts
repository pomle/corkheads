import { firestore } from "firebase/app";
import { Entry } from "types/Entry";
import { useStableIndex } from "./useStableIndex";
import { useSubscribers } from "./useSubscribers";
import { useIndex } from "./useIndex";
import { usePath } from "./usePath";
import { ResultMap } from "./ResultMap";
import { useStableIds } from "./useStableIds";

export type QueryResult<T> = {
  busy: boolean;
  results: ResultMap<T>;
};

export function useFlatResult<T>(id: string, result: ResultMap<T>) {
  return result ? result.get(id) : null;
}

export function useStore<T>(
  collection: firestore.CollectionReference<T>,
  unstableIds: string[]
): ResultMap<Entry<T>> {
  const ids = useStableIds(unstableIds);

  const path = usePath(collection);

  const index = useIndex<Entry<T>>(path);

  useSubscribers(collection, index, ids);

  return useStableIndex<Entry<T>>(ids, index);
}
