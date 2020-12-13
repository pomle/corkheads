import React, { useLayoutEffect, useRef } from "react";

interface PercentInputProps extends Partial<HTMLInputElement> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PercentInput: React.FC<PercentInputProps> = ({ value, onChange }) => {
  const element = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    const input = element.current;
    if (!input) {
      return;
    }

    const movePos = () => {
      const minPos = input.value.indexOf("%");

      const pos = [
        Math.min(input.selectionStart || 0, minPos),
        Math.min(input.selectionEnd || 0, minPos),
      ];

      input.setSelectionRange(pos[0], pos[1]);
    };

    input.addEventListener("keydown", movePos);
    return () => input.removeEventListener("keydown", movePos);
  }, []);

  const treatedValue = value.length > 0 ? value.replace(/%/g, "") + "%" : "";

  return (
    <input
      ref={element}
      placeholder="%"
      type="text"
      value={treatedValue}
      onChange={onChange}
    />
  );
};

export default PercentInput;
