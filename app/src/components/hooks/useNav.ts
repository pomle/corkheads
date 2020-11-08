import { Path } from "lib/path";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export function useNav<P extends Path<{}>>(path: P) {
  const history = useHistory();
  return useCallback(
    (params: Parameters<typeof path.url>[0]) => {
      const url = path.url(params);
      history.push(url);
    },
    [history, path]
  );
}
