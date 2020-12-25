import { firestore } from "firebase/app";
import { Entry } from "types/Entry";
import { useStableIndex } from "./useStableIndex";
import { useSubscribers } from "./useSubscribers";
import { useIndex } from "./useIndex";
import { usePath } from "./usePath";
import { ResultMap } from "./ResultMap";
import { useStableIds } from "./useStableIds";
import { useMemo } from "react";

export type QueryResult<T> = {
  busy: boolean;
  results: ResultMap<T>;
};

export type QueryRequest<T> = {
  busy: boolean;
  results: T[];
};

export function useStore<T>(
  collection: firestore.CollectionReference<T>,
  unstableIds: string[]
): ResultMap<Entry<T>> {
  const ids = useStableIds(unstableIds);

  const path = usePath(collection);

  const index = useIndex<Entry<T>>(path);

  useSubscribers(collection, index.set, ids);

  return useStableIndex<Entry<T>>(ids, index.get);
}

export function useSingle<T>(result: ResultMap<T>, id?: string): T | undefined {
  return useMemo(() => {
    if (id === undefined || result.size === 0) {
      return undefined;
    }

    return result.get(id);
  }, [id, result]);
}
