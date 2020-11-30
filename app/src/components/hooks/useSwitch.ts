import { useCallback, useMemo, useState } from "react";

/*
  Hook providing a handle for togglable booleans.
  Provides memoized instances of the current state plus,
  on, off, toggle, and set functions to change the state.
*/
export function useSwitch(initialState: boolean) {
  const [active, setActive] = useState<boolean>(initialState);

  const on = useCallback(() => {
    setActive(true);
  }, [setActive]);

  const off = useCallback(() => {
    setActive(false);
  }, [setActive]);

  const toggle = useCallback(() => {
    setActive((active) => !active);
  }, [setActive]);

  return useMemo(
    () => ({
      active,
      on,
      off,
      toggle,
      set: setActive,
    }),
    [active, on, off, toggle, setActive]
  );
}
