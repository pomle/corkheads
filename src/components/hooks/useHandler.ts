import { useCallback, useState, useRef } from "react";

export type HandlerState<Input extends any[]> = {
  busy: boolean;
  callback: (...args: Input) => void;
  error: Error | null;
};

/*
Wrap a callback in a handler that handles
  * Busy state
  * Hammer blocking
  * Errors
in a consistent way.
*/
export const useHandler = <Input extends any[], Response>(
  resolver: (...args: Input) => Promise<Response>
): HandlerState<Input> => {
  const [busy, setBusy] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const inFlight = useRef<boolean>(false);

  const callback = useCallback(
    async (...args: Input) => {
      if (inFlight.current === true) {
        return;
      }

      inFlight.current = true;
      setBusy(true);
      setError(null);

      try {
        await resolver(...args);
      } catch (error) {
        setError(error);
      }

      inFlight.current = false;
      setBusy(false);
    },
    [resolver]
  );

  return {
    busy,
    callback,
    error
  };
};
