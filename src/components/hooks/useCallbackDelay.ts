import { useCallback } from "react";

export const useCallbackDelay = (fn: () => void, delayMs = 2000) => {
  return useCallback(() => {
    setTimeout(fn, delayMs);
  }, [delayMs, fn]);
};
