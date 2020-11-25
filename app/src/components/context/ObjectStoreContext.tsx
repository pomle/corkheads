import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";

type Store = Record<string, unknown>;

const EMPTY = Object.create(null);

type ObjectStoreContextValue = [Store, Dispatch<SetStateAction<Store>>];

const Context = createContext<ObjectStoreContextValue>([{}, () => undefined]);

export const ObjectStoreContext: React.FC = ({ children }) => {
  const state = useState<Store>(EMPTY);
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export function useObjectStore() {
  return useContext(Context);
}

export function useObjectIndex<T>(
  ids: string[],
  namespace: string
): [Record<string, T>, (id: string, object: T) => void] {
  const [store, setStore] = useObjectStore();
  const index = useRef<Record<string, T>>(EMPTY);
  const path = useCallback((id: string) => `${namespace}/${id}`, [namespace]);

  const data = useMemo(() => {
    const newIndex = Object.create(null);
    let updateIndex = false;

    for (const id of ids) {
      const key = path(id);
      if (store[key]) {
        newIndex[id] = store[key];
        if (newIndex[id] !== index.current[id]) {
          updateIndex = true;
        }
      }
    }

    if (updateIndex) {
      index.current = newIndex;
    }

    return index.current;
  }, [path, ids, store]);

  const updateIndex = useCallback(
    (id: string, object: T) => {
      const key = path(id);
      setStore((store) => ({ ...store, [key]: object }));
    },
    [path, setStore]
  );

  return [data, updateIndex];
}
