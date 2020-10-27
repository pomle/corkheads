import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect
} from "react";
import moment, { Moment } from "moment";

export enum Severity {
  Error,
  Alert
}

export type ErrorEntry = {
  id: number;
  date: Moment;
  error: Error;
  severity: Severity;
};

type ErrorContextValue = {
  entries: ErrorEntry[];
  publish: (error: Error, severity?: Severity) => void;
  dismiss: (entry: ErrorEntry) => void;
  clear: () => void;
};

const noop = () => undefined;

const Context = createContext<ErrorContextValue>({
  entries: [],
  publish: noop,
  dismiss: noop,
  clear: noop
});

export const ErrorContext: React.FC = ({ children }) => {
  const [entries, setEntries] = useState<ErrorEntry[]>([]);
  const errorId = useRef<number>(0);

  const publish = useCallback(
    (error: Error, severity: Severity = Severity.Error) => {
      errorId.current += 1;
      const entry = {
        id: errorId.current,
        date: moment(),
        error,
        severity
      };
      setEntries(entries => [entry, ...entries]);
    },
    [setEntries]
  );

  const dismiss = useCallback(
    (entry: ErrorEntry) => {
      setEntries(entries => entries.filter(e => e !== entry));
    },
    [setEntries]
  );

  const clear = useCallback(() => {
    setEntries([]);
  }, [setEntries]);

  const value = useMemo(
    () => ({
      entries,
      publish,
      dismiss,
      clear
    }),
    [entries, publish, dismiss, clear]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useErrorHandler = () => {
  return useContext(Context);
};

export const usePublishError = (error?: Error) => {
  const { publish } = useErrorHandler();

  useEffect(() => {
    if (error) {
      publish(error);
    }
  }, [publish, error]);
};
