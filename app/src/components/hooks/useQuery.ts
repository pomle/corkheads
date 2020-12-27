import { useCallback, useMemo } from "react";
import { useURLParams } from "./useURLParams";

export function useQuery(key: string): [string, (query: string) => void] {
  const { params, setParam } = useURLParams();

  const query = useMemo(() => {
    return params.get(key) || "";
  }, [key, params]);

  const setQuery = useCallback(
    (query: string) => {
      setParam(key, query);
    },
    [key, setParam]
  );

  return [query, setQuery];
}
