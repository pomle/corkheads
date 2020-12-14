import { useCallback, useState } from "react";

export function useScrollSize(
  min: number,
  max: number,
  inc: number
): [number, () => void] {
  const [size, setSize] = useState<number>(min);

  const bump = useCallback(() => {
    setSize((size) => Math.min(size + inc, max));
  }, [inc, max]);

  return [size, bump];
}
