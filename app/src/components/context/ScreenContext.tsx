import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useHistory } from "react-router";
import ViewStack from "components/ui/layout/ViewStack";
import Screen from "components/route/Screen";
import { Path, PathCodec } from "lib/path";

type Mount<P extends Path<PathCodec> = Path<PathCodec>> = {
  mountPath: P;
  render: (params: ReturnType<P["decode"]>[0]) => React.ReactElement;
  transition?: React.FC<{ active: boolean }>;
};

function useScreenState() {
  return useState<Mount[]>([]);
}

type ScreenContextValue = {
  sourcePath: Path<{}>;
  state: ReturnType<typeof useScreenState>;
};

const Context = createContext<ScreenContextValue | null>(null);

interface ScreenContextProps {
  mountPath: Path<{}>;
}

export const ScreenContext: React.FC<ScreenContextProps> = ({
  mountPath,
  children,
}) => {
  const state = useScreenState();

  const value = useMemo(
    () => ({
      sourcePath: mountPath,
      state,
    }),
    [mountPath, state]
  );

  console.log(state[0]);

  return (
    <Context.Provider value={value}>
      <ViewStack>
        {children}

        {state[0].map((mount) => {
          return (
            <Screen path={mount.mountPath} transition={mount.transition}>
              {mount.render}
            </Screen>
          );
        })}
      </ViewStack>
    </Context.Provider>
  );
};

function add<T>(value: T) {
  return function addValue(values: T[]) {
    return [...values, value];
  };
}

function remove<T>(value: T) {
  return function removeValue(values: T[]) {
    return values.filter((v) => v !== value);
  };
}

function useScreenContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useScreen without ScreenContext");
  }
  return context;
}

export function useScreen<P extends Path<PathCodec>>({
  path: makePath,
  render,
  transition,
}: {
  path: (sourcePath: Path<{}>) => P;
  render: (params: ReturnType<P["decode"]>[0]) => React.ReactElement;
  transition?: React.FC<{ active: boolean }>;
}) {
  const context = useScreenContext();

  const {
    sourcePath,
    state: [, setMounts],
  } = context;

  const mountPath = useMemo(() => {
    return makePath(sourcePath);
  }, [sourcePath]);

  useEffect(() => {
    const mount: Mount = {
      mountPath,
      render,
      transition,
    };

    setMounts(add(mount));

    return () => setMounts(remove(mount));
  }, [mountPath, transition, setMounts]);

  const history = useHistory();

  return useCallback(
    (params: Parameters<typeof mountPath["url"]>[0]) => {
      const url = mountPath.url(params);
      history.push(url);
    },
    [mountPath, history]
  );
}

export function useBack() {
  const { sourcePath } = useScreenContext();

  const history = useHistory();

  return useCallback(() => {
    const url = sourcePath.url({});
    history.push(url);
  }, [sourcePath, history]);
}
