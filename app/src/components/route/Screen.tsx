import React, { useEffect, useRef, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { PathCodec, Path, createPath } from "lib/path";

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
  const [mount, setMount] = useState<boolean>(true);

  const element = useRef<React.ReactElement | null>(null);
  const match = useRouteMatch<any>(path.path);

  const active = exact ? !!(match && match.isExact) : !!match;

  if (match) {
    if (element.current === null || active) {
      const params = path.decode(match.params);
      const matchedPath = createPath(match.url, {});
      element.current = Component({ path: matchedPath, params });
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
