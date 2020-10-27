import React, { createContext, useContext, useCallback, useState } from "react";

type State = {
  [key: string]: any;
};

type SharedStateValue = [State, React.Dispatch<React.SetStateAction<State>>];

const fail = () => {
  throw new Error("State stored without context");
};

const Context = createContext<SharedStateValue>([{}, fail]);

export const SharedStateContext: React.FC = ({ children }) => {
  const state = useState<State>({});
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export function useSharedState<T>(
  key: string,
  fallbackValue: T
): [T, (value: T) => void] {
  const [state, setState] = useContext(Context);

  const setValue = useCallback(
    (value: T) => {
      setState(values => ({ ...values, [key]: value }));
    },
    [key, setState]
  );

  const value = key in state ? state[key] : fallbackValue;

  return [value, setValue];
}
