import { useMemo, useRef } from "react";
import { ResultMap } from "./ResultMap";

export function useStableIndex<T>(
  ids: string[],
  get: (id: string) => T | undefined
) {
  const initial = useMemo(() => new ResultMap<T>(), []);

  const cache = useRef<ResultMap<T>>(initial);

  return useMemo(() => {
    if (ids.length === 0) {
      return initial;
    }

    const result = new ResultMap<T>();

    let updateCache = false;

    for (const id of ids) {
      const content = get(id);
      if (!content) {
        return initial;
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
  }, [ids, get, initial]);
}
