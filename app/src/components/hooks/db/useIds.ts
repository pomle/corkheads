import { debounce } from "lib/debounce";
import { useMemo, useState } from "react";

export function useIds(): [string[], (ids: string[]) => void] {
  const [ids, setIds] = useState<string[]>([]);
  const updateIds = useMemo(() => debounce(setIds, 250), []);
  return [ids, updateIds];
}
