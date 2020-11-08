import React, { useRef } from "react";
import { useRouteMatch } from "react-router-dom";
import { PathCodec, Path } from "lib/path";

const Screen = <PathCodecType extends PathCodec>({
  path,
  exact = false,
  transition: Transition,
  children: Component,
}: {
  path: Path<PathCodecType>;
  exact?: boolean;
  transition?: React.FC<{ active: boolean }>;
  children: (
    params: ReturnType<Path<PathCodecType>["decode"]>
  ) => React.ReactElement;
}) => {
  const element = useRef<React.ReactElement | null>(null);
  const match = useRouteMatch<any>(path.path);

  const active = exact ? !!(match && match.isExact) : !!match;

  if (match) {
    if (element.current === null || active) {
      const params = path.decode(match.params);
      element.current = Component(params);
    }
  }

  if (Transition) {
    return <Transition active={active}>{element.current}</Transition>;
  }

  return element.current;
};

export default Screen;
