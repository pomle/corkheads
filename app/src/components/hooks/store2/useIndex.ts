import { useCallback, useMemo } from "react";
import { useFirebaseStore } from "components/context/FirebaseStore";

export function useIndex<T>(path: (id: string) => string) {
  const { store, queue } = useFirebaseStore();

  const get = useCallback(
    (id: string) => {
      const key = path(id);
      return store[key] as T | undefined;
    },
    [path, store]
  );

  const set = useCallback(
    (id: string, data: T) => {
      const key = path(id);
      queue(key, data);
    },
    [path, queue]
  );

  return useMemo(
    () => ({
      get,
      set,
    }),
    [get, set]
  );
}
