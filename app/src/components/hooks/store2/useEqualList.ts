import { useRef } from "react";
import { listEquals } from "lib/equality";

export function useEqualList<T>(next: T[]): T[] {
  const memo = useRef<T[]>([]);

  const prev = memo.current;
  if (!listEquals(next, prev)) {
    memo.current = next;
  }

  return memo.current;
}
