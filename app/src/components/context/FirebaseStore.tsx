import { debounce } from "lib/debounce";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

type Entries = Record<string, unknown>;

type FirebaseStoreContextValue = {
  store: Entries;
  update: (entries: Entries) => void;
  queue: (id: string, data: unknown) => void;
};

const Context = createContext<FirebaseStoreContextValue>({
  store: {},
  update: () => undefined,
  queue: () => undefined,
});

const EMPTY = {};

export const FirebaseStoreContext: React.FC = ({ children }) => {
  const [store, setStore] = useState<Entries>(EMPTY);

  const update = useCallback(
    (entries: Entries) => {
      setStore((store) => {
        return { ...store, ...entries };
      });
    },
    [setStore]
  );

  const queue = useMemo(() => {
    let buffer: Entries = {};

    const flush = debounce(() => {
      update(buffer);
      buffer = {};
    }, 150);

    return (id: string, data: unknown) => {
      buffer[id] = data;
      flush();
    };
  }, [update]);

  const value = useMemo(
    () => ({
      store,
      update,
      queue,
    }),
    [store, update, queue]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useFirebaseStore() {
  return useContext(Context);
}
