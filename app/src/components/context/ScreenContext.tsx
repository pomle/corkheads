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
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";

type Mount<P extends Path<PathCodec>> = {
  mountPath: P;
  render: (params: Parameters<P["decode"]>[0]) => React.ReactElement;
  transition?: React.FC<{ active: boolean }>;
};

const ErrorHandler: React.FC = ({ children }) => {
  const nav = { back: <BackButton onClick={useBack} /> };

  return <ErrorBoundary nav={nav}>{() => <>{children}</>}</ErrorBoundary>;
};

function useScreenState() {
  return useState<Mount<Path<PathCodec>>[]>([]);
}

type ScreenContextValue = {
  originPath: Path<{}>;
  sourcePath: Path<{}>;
  state: ReturnType<typeof useScreenState>;
};

const Context = createContext<ScreenContextValue | null>(null);

interface ScreenContextProps {
  originPath: Path<{}>;
  mountPath: Path<{}>;
}

export const ScreenContext: React.FC<ScreenContextProps> = ({
  originPath,
  mountPath,
  children,
}) => {
  const state = useScreenState();

  const value = useMemo(
    () => ({
      originPath,
      sourcePath: mountPath,
      state,
    }),
    [originPath, mountPath, state]
  );

  const [mounts] = state;

  return (
    <Context.Provider value={value}>
      <ViewStack>
        {children}

        {mounts.map((mount) => {
          return (
            <Screen
              key={mount.mountPath.path}
              path={mount.mountPath}
              transition={mount.transition}
            >
              {(screen) => (
                <ScreenContext originPath={mountPath} mountPath={screen.path}>
                  <div data-path={screen.path} />
                  <ErrorHandler>{mount.render(screen.params)}</ErrorHandler>
                </ScreenContext>
              )}
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
  render: (params: Parameters<P["decode"]>[0]) => React.ReactElement;
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
    const mount: Mount<Path<PathCodec>> = {
      mountPath,
      render,
      transition,
    };

    setMounts(add(mount));

    return () => setMounts(remove(mount));
  }, [mountPath, transition, setMounts]);

  const history = useHistory();

  return useCallback(
    (params: Parameters<P["url"]>[0]) => {
      const url = mountPath.url(params);
      history.push(url);
    },
    [mountPath, history]
  );
}

export function useBack() {
  const { originPath } = useScreenContext();

  const history = useHistory();

  return useCallback(() => {
    const url = originPath.url({});
    history.push(url);
  }, [originPath, history]);
}

export function createPath(pathString: string, codec: PathCodec = {}) {
  return function appendPath(path: Path<{}>) {
    return path.append(pathString, codec);
  };
}
