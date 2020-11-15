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
  ids: string[],
  namespace: string
): [
  {
    [key: string]: T;
  },
  (id: string, object: T) => void
] {
  const path = useCallback((id: string) => `${namespace}/${id}`, [namespace]);

  const [store, setStore] = useObjectStore();

  const updateIndex = useCallback(
    (id: string, object: T) => {
      const key = path(id);
      setStore((store) => ({ ...store, [key]: object }));
    },
    [path, setStore]
  );

  const data = useMemo(() => {
    const index = Object.create(null);

    for (const id of ids) {
      const key = path(id);
      if (store[key]) {
        index[id] = store[key];
      }
    }

    return index;
  }, [ids, path, store]);

  return [data, updateIndex];
}
