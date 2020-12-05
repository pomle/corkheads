import { useCallback, useState, useRef } from "react";

export type HandlerState<Input extends any[]> = {
  busy: boolean;
  callback: (...args: Input) => void;
};

/*
Wrap a callback in a handler that handles
  * Busy state
  * Hammer blocking
  * Errors
in a consistent way.
*/
export const useAsyncCallback = <Input extends any[], Response>(
  resolver: (...args: Input) => Promise<Response>
): HandlerState<Input> => {
  const [busy, setBusy] = useState<boolean>(false);
  const inFlight = useRef<boolean>(false);

  const callback = useCallback(
    async (...args: Input) => {
      if (inFlight.current === true) {
        return;
      }

      inFlight.current = true;
      setBusy(true);

      const promise = new Promise((resolve, reject) => {
        resolver(...args).then(resolve);
      });

      promise.finally(() => {
        inFlight.current = false;
        setBusy(false);
      });

      return promise;
    },
    [resolver]
  );

  return {
    busy,
    callback,
  };
};
