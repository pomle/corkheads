import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from "react";

type PopupDialogContextValue = {
  content: React.ReactNode;
  publish: (content: React.ReactNode) => void;
  clear: () => void;
};

const noop = () => undefined;

const Context = createContext<PopupDialogContextValue>({
  content: undefined,
  publish: noop,
  clear: noop,
});

export const PopupDialogContext: React.FC = ({ children }) => {
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
      clear,
    }),
    [content, publish, clear]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const usePopupDialog = () => {
  return useContext(Context);
};
