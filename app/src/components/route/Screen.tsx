import React, { useEffect, useRef, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { PathCodec, Path } from "lib/path";

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
  children: (
    params: ReturnType<Path<PathCodecType>["decode"]>
  ) => React.ReactElement;
}) => {
  const [mount, setMount] = useState<boolean>(true);

  const element = useRef<React.ReactElement | null>(null);
  const match = useRouteMatch<any>(path.path);

  const active = exact ? !!(match && match.isExact) : !!match;

  if (match) {
    if (element.current === null || active) {
      const params = path.decode(match.params);
      element.current = Component(params);
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
