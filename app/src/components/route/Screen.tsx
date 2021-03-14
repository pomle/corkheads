import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { PathCodec, Path, createPath } from "lib/path";

const rootPath = createPath("/", {});

type Route = {
  back: () => void;
  path: Path<PathCodec>;
};

const Context = React.createContext<Route>({
  back: () => undefined,
  path: rootPath,
});

export function useRoute() {
  return useContext(Context);
}

const Screen = <PathCodecType extends PathCodec>({
  path,
  exact = false,
  unmount = 5000,
  transition: Transition,
  children: Component,
}: {
  path: Path<PathCodecType>;
  exact?: boolean;
  unmount?: number;
  transition?: React.FC<{ active: boolean }>;
  children: ({
    params,
    path,
  }: {
    params: ReturnType<Path<PathCodecType>["decode"]>;
    path: Path<{}>;
  }) => React.ReactElement;
}) => {
  const history = useHistory();
  const route = useRoute();

  const back = useCallback(() => {
    const url = route.path.url({});
    history.push(url);
  }, [route.path, history]);

  const [mount, setMount] = useState<boolean>(true);

  const element = useRef<React.ReactElement | null>(null);
  const match = useRouteMatch<any>(path.path);

  const active = exact ? !!(match && match.isExact) : !!match;

  if (match) {
    if (element.current === null || active) {
      const params = path.decode(match.params);
      const matchedPath = createPath(match.url, {});
      element.current = (
        <Context.Provider value={{ back, path: matchedPath }}>
          {Component({ path: matchedPath, params })}
        </Context.Provider>
      );
    }
  }

  useEffect(() => {
    if (active) {
      setMount(true);
    } else {
      const timer = setTimeout(setMount, unmount, false);
      return () => clearTimeout(timer);
    }
  }, [active, unmount, setMount]);

  const content = active || mount ? element.current : null;

  if (Transition) {
    return <Transition active={active}>{content}</Transition>;
  }

  return content;
};

export default Screen;
