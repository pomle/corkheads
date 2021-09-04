import { useMemo } from "react";
import { CollectionResult } from "@pomle/react-firebase";

export function useSingle<T>(
  result: CollectionResult<T>,
  id?: string
): T | undefined {
  return useMemo(() => {
    if (id === undefined || result.size === 0) {
      return undefined;
    }

    return result.get(id);
  }, [id, result]);
}
