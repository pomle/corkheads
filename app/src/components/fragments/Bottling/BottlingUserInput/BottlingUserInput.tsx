import React, { useMemo } from "react";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { useUserInput } from "components/hooks/useUserInput";
import { Bottling } from "types/Bottling";
import { toBottling, toEntries } from "./conversion";

interface BottlingUserInputProps {
  bottling: Bottling;
  onChange: (bottling: Bottling) => void;
}

const BottlingUserInput: React.FC<BottlingUserInputProps> = ({
  bottling,
  onChange,
}) => {
  const entries = useMemo(() => {
    return toEntries(bottling);
  }, [bottling]);

  const userInput = useUserInput(entries, (entries) => {
    onChange(toBottling(entries));
  });

  return (
    <EntryList>
      <Entry name="Bottles">
        <input
          type="number"
          placeholder="# of bottles"
          {...userInput.bottleCount}
        />
      </Entry>
      <Entry name="Series">
        <input type="text" placeholder="Series name" {...userInput.series} />
      </Entry>
      <Entry name="Distilled">
        <input type="number" placeholder="Year" {...userInput.distilledYear} />
      </Entry>
      <Entry name="Distillery">
        <input
          type="text"
          placeholder="Distillery name"
          {...userInput.distillery}
        />
      </Entry>
      <Entry name="Bottled">
        <input type="number" placeholder="Year" {...userInput.bottledYear} />
      </Entry>
      <Entry name="Aged">
        <input type="number" placeholder="# of years" {...userInput.age} />
      </Entry>
      <Entry name="Alcohol">
        <input type="number" placeholder="%" {...userInput.abv} />
      </Entry>
    </EntryList>
  );
};

export default BottlingUserInput;
