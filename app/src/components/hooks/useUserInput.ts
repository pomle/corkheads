import { useCallback, useMemo, ChangeEvent, useState, useEffect } from "react";

type InputProps = {
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
};

export function useUserInput<T extends Record<string, string>>(
  initial: T,
  onChange: (value: T) => void
) {
  const [values, setValues] = useState<T>(initial);

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const merge = useCallback(
    (key: keyof T, value: string) => {
      const nextValues = { ...values, ...{ [key]: value } };
      setValues(nextValues);
      onChange(nextValues);
    },
    [values, onChange]
  );

  return useMemo(() => {
    const userInput = {} as Record<keyof T, InputProps>;

    for (let key in values) {
      userInput[key] = {
        value: values[key],
        onChange: (
          event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
          merge(key, event.target.value);
        },
      };
    }

    return userInput;
  }, [merge, values]);
}
