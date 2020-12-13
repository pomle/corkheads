import { useMemo, useRef } from "react";
import { ResultMap } from "./ResultMap";

interface Source<T> {
  get(id: string): T | undefined;
}

export function useStableIndex<T>(ids: string[], source: Source<T>) {
  const initial = useMemo(() => new ResultMap<T>(), []);

  const cache = useRef<ResultMap<T>>(initial);

  return useMemo(() => {
    if (ids.length === 0) {
      return null;
    }

    const result = new ResultMap<T>();

    let updateCache = false;

    for (const id of ids) {
      const content = source.get(id);
      if (!content) {
        return null;
      }

      result.set(id, content);
      if (cache.current.get(id) !== content) {
        updateCache = true;
      }
    }

    if (updateCache) {
      cache.current = result;
    }

    return cache.current;
  }, [ids, source]);
}
