import { useMemo, useRef } from "react";

export function useStableIds<T>(next: T[]): T[] {
  const cache = useRef<T[]>([]);

  const index = useMemo(() => new Set(next), [next]);

  return useMemo(() => {
    const needsRebuild =
      index.size !== cache.current.length ||
      cache.current.some((value) => !index.has(value));

    if (needsRebuild) {
      cache.current = Array.from(index);
    }

    return cache.current;
  }, [index]);
}
