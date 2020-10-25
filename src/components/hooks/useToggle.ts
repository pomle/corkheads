import { useCallback, useState } from "react";

export const useToggle = <T>(): [Set<T>, (value: T) => void, () => void] => {
  const [selected, setSelected] = useState<Set<T>>(new Set<T>());

  const toggle = useCallback(item => {
    setSelected(prev => {
      const next = new Set<T>(prev);
      prev.forEach(item => next.add(item));
      if (prev.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setSelected(new Set<T>());
  }, [setSelected]);

  return [selected, toggle, clear];
};
