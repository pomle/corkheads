import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export function useNav(path: string) {
  const history = useHistory();
  return useCallback(() => {
    history.push(path);
  }, [history, path]);
}
