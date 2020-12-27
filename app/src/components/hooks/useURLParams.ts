import { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";

export function useURLParams() {
  const history = useHistory();

  const params = useMemo(() => {
    return new URLSearchParams(history.location.search);
  }, [history.location]);

  const setParam = useCallback(
    (key: string, value: string) => {
      params.set(key, value);
      const location = {
        ...history.location,
        search: params.toString(),
      };
      history.replace(location);
    },
    [history, params]
  );

  return { params, setParam };
}
