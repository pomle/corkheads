import React, { useRef, useLayoutEffect } from "react";
import { AABB, intersects } from "lib/math";

interface ViewportDetectorProps {
  onEnter?: () => void;
  onExit?: () => void;
}

const EXPAND: AABB = {
  t: 0.25,
  b: 0,
  l: 0,
  r: 0,
};

const style = {
  width: "100%",
};

const ViewportDetector: React.FC<ViewportDetectorProps> = ({
  onEnter,
  onExit,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const view = node.offsetParent as HTMLDivElement;
    if (!view) {
      return;
    }

    let inView = false;

    const onScroll = () => {
      const A: AABB = {
        t: view.scrollTop,
        l: view.scrollLeft,
        b: view.scrollTop + view.offsetHeight,
        r: view.scrollLeft + view.offsetWidth,
      };

      const B: AABB = {
        t: node.offsetTop - view.offsetHeight * EXPAND.t,
        l: node.offsetLeft - view.offsetWidth * EXPAND.l,
        b: node.offsetTop + node.offsetHeight + view.offsetHeight * EXPAND.b,
        r: node.offsetLeft + node.offsetWidth + view.offsetWidth * EXPAND.r,
      };

      const overlap = intersects(A, B);
      const hit = overlap.y;
      if (hit !== inView) {
        if (hit) {
          onEnter && onEnter();
        } else {
          onExit && onExit();
        }
        inView = hit;
      }
    };

    onScroll();
    view.addEventListener("scroll", onScroll);
    return () => view.removeEventListener("scroll", onScroll);
  }, [onEnter, onExit]);

  return <div ref={ref} style={style} />;
};

export default ViewportDetector;
