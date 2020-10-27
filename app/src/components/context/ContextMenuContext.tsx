import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState
} from "react";

type ContextMenuContextValue = {
  content: React.ReactNode;
  publish: (content: React.ReactNode) => void;
  clear: () => void;
};

const noop = () => undefined;

const Context = createContext<ContextMenuContextValue>({
  content: undefined,
  publish: noop,
  clear: noop
});

export const ContextMenuContext: React.FC = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode>();

  const publish = useCallback(
    (content: React.ReactNode) => {
      setContent(content);
    },
    [setContent]
  );

  const clear = useCallback(() => {
    setContent(undefined);
  }, [setContent]);

  const value = useMemo(
    () => ({
      content,
      publish,
      clear
    }),
    [content, publish, clear]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useContextMenu = () => {
  return useContext(Context);
};
