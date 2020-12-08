import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { useUserInput } from "components/hooks/useUserInput";
import { Bottling } from "types/Bottling";
import { toBottling, toEntries } from "./conversion";

const useStyles = makeStyles({
  BottlingUserInput: {
    "& section h4": {
      margin: "32px 0 8px 0",
    },
  },
});

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

  const classes = useStyles();

  return (
    <div className={classes.BottlingUserInput}>
      <section>
        <EntryList>
          <Entry name="Label">
            <input
              type="text"
              placeholder="Label name"
              {...userInput.bottleLabel}
            />
          </Entry>

          <Entry name="Series">
            <input
              type="text"
              placeholder="Series name"
              {...userInput.series}
            />
          </Entry>

          <Entry name="Distillery">
            <input
              type="text"
              placeholder="Name of distiller"
              {...userInput.distillerName}
            />
          </Entry>

          <Entry name="Bottled by">
            <input
              type="text"
              placeholder="Name of bottler"
              {...userInput.bottlerName}
            />
          </Entry>

          <Entry name="Age">
            <input type="number" placeholder="# of years" {...userInput.age} />
          </Entry>

          <Entry name="Alcohol">
            <input type="number" placeholder="%" {...userInput.abv} />
          </Entry>
        </EntryList>
      </section>

      <section>
        <h4>The Whisky</h4>

        <EntryList>
          <Entry name="Date distilled">
            <input
              type="number"
              placeholder="Year"
              {...userInput.distillYear}
            />
          </Entry>

          <Entry name="Date bottled">
            <input
              type="number"
              placeholder="Year"
              {...userInput.bottlingYear}
            />
          </Entry>

          <Entry name="Age">
            <input type="number" placeholder="# of years" {...userInput.age} />
          </Entry>

          <Entry name="Cask No.">
            <input
              type="text"
              placeholder="Cask serial no."
              {...userInput.distillCaskNo}
            />
          </Entry>

          <Entry name="Cask type">
            <input
              type="text"
              placeholder="Olorosso, Bourbon"
              {...userInput.distillCaskType}
            />
          </Entry>

          <Entry name="Batch No.">
            <input
              type="text"
              placeholder="Batch serial no."
              {...userInput.distillBatchNo}
            />
          </Entry>

          <Entry name="Alcohol">
            <input type="number" placeholder="%" {...userInput.abv} />
          </Entry>
        </EntryList>
      </section>

      <section>
        <h4>The Distillery</h4>
        <EntryList>
          <Entry name="Distilled by">
            <input
              type="text"
              placeholder="Distillery name"
              {...userInput.distillerName}
            />
          </Entry>

          <Entry name="Country">
            <input
              type="text"
              placeholder="ex. Scotland"
              {...userInput.distillerCountry}
            />
          </Entry>

          <Entry name="District">
            <input
              type="text"
              placeholder="ex. Islay"
              {...userInput.distillerDistrict}
            />
          </Entry>
        </EntryList>
      </section>

      <section>
        <h4>The Bottle</h4>

        <EntryList>
          <Entry name="Bottled by">
            <input
              type="text"
              placeholder="Name of bottler"
              {...userInput.bottlerName}
            />
          </Entry>

          <Entry name="Bottles produced">
            <input
              type="number"
              placeholder="# of bottles"
              {...userInput.bottleCount}
            />
          </Entry>

          <Entry name="Bottle sizes">
            <input
              type="text"
              placeholder="ex. 70cl, 40cl"
              {...userInput.bottleSize}
            />
          </Entry>

          <Entry name="Bottle code">
            <input
              type="text"
              placeholder="ex. L6 3224"
              {...userInput.bottleCode}
            />
          </Entry>

          <Entry name="Barcode">
            <input type="number" placeholder="ex. 312541512" />
          </Entry>
        </EntryList>
      </section>
    </div>
  );
};

export default BottlingUserInput;
