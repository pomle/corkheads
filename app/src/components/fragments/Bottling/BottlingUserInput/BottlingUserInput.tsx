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
      <Entry name="Bottles produced">
        <input
          type="number"
          placeholder="# of bottles"
          {...userInput.bottleCount}
        />
      </Entry>

      <Entry name="Series">
        <input type="text" placeholder="Series name" {...userInput.series} />
      </Entry>

      <Entry name="Distilled in">
        <input type="number" placeholder="Year" {...userInput.distillYear} />
      </Entry>

      <Entry name="Distilled by">
        <input
          type="text"
          placeholder="Distillery name"
          {...userInput.distillerName}
        />
      </Entry>

      <Entry name="Distiller country">
        <input
          type="text"
          placeholder="Country"
          {...userInput.distillerCountry}
        />
      </Entry>

      <Entry name="Bottled by">
        <input
          type="number"
          placeholder="Bottler name"
          {...userInput.bottlerName}
        />
      </Entry>

      <Entry name="Bottled in">
        <input type="number" placeholder="Year" {...userInput.bottlingYear} />
      </Entry>

      <Entry name="Bottle sizes">
        <input
          type="number"
          placeholder="Sizes of bottles"
          {...userInput.bottleSize}
        />
      </Entry>

      <Entry name="Aged">
        <input type="number" placeholder="# of years" {...userInput.age} />
      </Entry>

      <Entry name="Alcohol">
        <input type="number" placeholder="%" {...userInput.abv} />
      </Entry>

      <Entry name="Distill Cask No.">
        <input
          type="number"
          placeholder="Cask serial no."
          {...userInput.distillCaskNo}
        />
      </Entry>

      <Entry name="Distill Batch No.">
        <input
          type="number"
          placeholder="Batch serial no."
          {...userInput.distillBatchNo}
        />
      </Entry>
    </EntryList>
  );
};

export default BottlingUserInput;
