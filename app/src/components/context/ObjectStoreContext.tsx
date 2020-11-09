import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type Store = {
  [key: string]: unknown;
};

const EMPTY_STORE = Object.create(null);

type ObjectStoreContextValue = [Store, Dispatch<SetStateAction<Store>>];

const Context = createContext<ObjectStoreContextValue>([{}, () => undefined]);

export const ObjectStoreContext: React.FC = ({ children }) => {
  const state = useState<Store>(EMPTY_STORE);
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export function useObjectStore() {
  return useContext(Context);
}
