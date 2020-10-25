import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useMemo
} from "react";

type ScrollPos = {
  x?: number;
  y?: number;
};

type ScrollContextValue = {
  to: (pos: ScrollPos) => void;
  reveal: (node: HTMLElement) => void;
};

const noop = () => undefined;

const Context = createContext<ScrollContextValue>({
  to: noop,
  reveal: noop
});

export const ScrollContext = Context.Provider;

export function useScrollHandle<T extends HTMLElement>(): [
  React.RefObject<T>,
  ScrollContextValue
] {
  const ref = useRef<T>(null);

  const to = useCallback((pos: ScrollPos) => {
    const node = ref.current;

    if (node) {
      node.scrollTo({
        left: pos.x,
        top: pos.y,
        behavior: "smooth"
      });
    }
  }, []);

  const reveal = useCallback(
    (node: HTMLElement) => {
      to({
        x: node.offsetLeft,
        y: node.offsetTop
      });
    },
    [to]
  );

  return useMemo(
    () => [
      ref,
      {
        reveal,
        to
      }
    ],
    [reveal, to]
  );
}

export const useScroll = () => {
  return useContext(Context);
};
