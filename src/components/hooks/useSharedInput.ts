import { useMemo } from "react";
import { useSharedState } from "components/context/SharedState";

export function useSharedInput(namespace: string, initial: string) {
  const key = useMemo(() => {
    return "user/input/" + namespace;
  }, [namespace]);

  return useSharedState(key, initial);
}
