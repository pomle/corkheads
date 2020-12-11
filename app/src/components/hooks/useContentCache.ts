import { useMemo, useRef } from "react";

export function useContentCache(
  renderer: () => React.ReactElement | undefined,
  deps: any[]
): React.ReactElement | null {
  const cache = useRef<React.ReactElement>();

  useMemo(() => {
    const content = renderer();
    if (content !== undefined) {
      cache.current = content;
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return cache.current || null;
}
