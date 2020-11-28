import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  ChangeEvent,
} from "react";

type State<S> = [S, Dispatch<SetStateAction<S>>];

type InputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useUserInput<T extends Record<string, string>>([
  value,
  setValue,
]: State<T>) {
  const merge = useCallback(
    (key: keyof T, value: string) => {
      setValue((values) => {
        return { ...values, ...{ [key]: value } };
      });
    },
    [setValue]
  );

  return useMemo(() => {
    const userInput = {} as Record<keyof T, InputProps>;

    for (let key in value) {
      userInput[key] = {
        value: value[key],
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          merge(key, event.target.value);
        },
      };
    }

    return userInput;
  }, [merge, value]);
}
