import { useMemo } from "react";
import { useFirebaseStore } from "components/context/FirebaseStore";

export function useIndex<T>(path: (id: string) => string) {
  const { store, queue } = useFirebaseStore();

  return useMemo(
    () => ({
      get(id: string): T | undefined {
        const key = path(id);
        return store[key] as T | undefined;
      },
      set(id: string, data: T) {
        const key = path(id);
        queue(key, data);
      },
    }),
    [store, queue, path]
  );
}
