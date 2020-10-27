import { useState, useEffect } from "react";

export const useAutoClearState = <T>(
  timeout: number,
  clearedValue: T | undefined = undefined
): [T | undefined, (value: T) => void] => {
  const [value, setValue] = useState<T | undefined>(clearedValue);

  useEffect(() => {
    const timer = setTimeout(setValue, timeout, clearedValue);
    return () => clearTimeout(timer);
  }, [value, setValue, timeout, clearedValue]);

  return [value, setValue];
};
