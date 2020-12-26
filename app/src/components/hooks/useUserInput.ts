import { useCallback, useMemo, ChangeEvent, useState, useEffect } from "react";

function isTextInput(
  input: HTMLInputElement | HTMLSelectElement
): input is HTMLInputElement {
  if ("type" in input) {
    if (input.type === "text") {
      return true;
    }
  }
  return false;
}

function readValue(input: HTMLInputElement | HTMLSelectElement) {
  const value = input.value;
  if (isTextInput(input)) {
    if (input.pattern) {
      const re = new RegExp(`${input.pattern}`);
      return value.replace(re, "");
    }
  }
  return value;
}

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
          const value = readValue(event.target);
          merge(key, value);
        },
      };
    }

    return userInput;
  }, [merge, values]);
}
