import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
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

export function useObjectIndex<T>(
  ids: string[]
): [
  {
    [key: string]: T;
  },
  (id: string, object: T) => void
] {
  const [store, setStore] = useObjectStore();

  const updateIndex = useCallback(
    (id: string, object: T) => {
      setStore((store) => ({ ...store, [id]: object }));
    },
    [setStore]
  );

  const data = useMemo(() => {
    const index = Object.create(null);

    for (const id of ids) {
      if (store[id]) {
        index[id] = store[id];
      }
    }

    return index;
  }, [ids, store]);

  return [data, updateIndex];
}
