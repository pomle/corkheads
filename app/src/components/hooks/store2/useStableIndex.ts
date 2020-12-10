import { useMemo, useRef } from "react";

const EMPTY = Object.create(null);

type Index<T> = Record<string, T>;

export function useStableIndex<T>(ids: string[], source: Index<T>) {
  const cache = useRef<Index<T>>(EMPTY);

  return useMemo(() => {
    if (ids.length === 0) {
      return null;
    }

    const entries: Index<T> = Object.create(null);

    let updateCache = false;

    for (const id of ids) {
      if (!(id in source)) {
        return null;
      }

      entries[id] = source[id];
      if (cache.current[id] !== entries[id]) {
        updateCache = true;
      }
    }

    if (updateCache) {
      cache.current = entries;
    }

    return cache.current;
  }, [ids, source]);
}
