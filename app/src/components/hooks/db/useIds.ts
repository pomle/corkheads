import { debounce } from "lib/debounce";
import { useMemo, useState } from "react";

export function useIds(): [string[], (ids: string[]) => void] {
  const [ids, setIds] = useState<string[]>([]);
  const updateIds = useMemo(() => debounce(setIds, 100), []);
  return [ids, updateIds];
}
