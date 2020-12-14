import React, { useRef, useLayoutEffect } from "react";
import { AABB, intersects } from "lib/math";

interface ViewportDetectorProps {
  onEnter?: () => void;
  onExit?: () => void;
  size?: { width: string; height: string };
}

const ViewportDetector: React.FC<ViewportDetectorProps> = ({
  onEnter,
  onExit,
  size = { height: "100px", width: "100%" },
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
        t: node.offsetTop,
        l: node.offsetLeft,
        b: node.offsetTop + node.offsetHeight,
        r: node.offsetLeft + node.offsetWidth,
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

  return <div ref={ref} style={size} />;
};

export default ViewportDetector;
