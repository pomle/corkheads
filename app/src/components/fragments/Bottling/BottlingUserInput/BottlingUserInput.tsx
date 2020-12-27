import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { useUserInput } from "components/hooks/useUserInput";
import { Bottling, Category } from "types/Bottling";
import { toBottling, toEntries } from "./conversion";
import PercentInput from "./components/PercentInput";

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

  const Age = (
    <input type="number" placeholder="# of years" {...userInput.age} />
  );

  const Alcohol = <PercentInput {...userInput.abv} />;

  const BatchNo = (
    <input
      type="text"
      placeholder="Batch serial no."
      {...userInput.distillBatchNo}
    />
  );

  const Bottler = (
    <input
      type="text"
      placeholder="Name of bottler"
      {...userInput.bottlerName}
    />
  );

  const BottleCode = (
    <input type="text" placeholder="ex. L6 3224" {...userInput.bottleCode} />
  );

  const BottlesProduced = (
    <input
      type="number"
      placeholder="# of bottles"
      {...userInput.bottleCount}
    />
  );

  const BottleBarCode = <input type="number" placeholder="ex. 312541512" />;

  const BottleSizes = (
    <input type="text" placeholder="ex. 70cl, 40cl" {...userInput.bottleSize} />
  );

  const BottlingCategory = (
    <select {...userInput.category} placeholder="Type">
      <option value={undefined} hidden></option>
      <option value={Category.Blended}>Blended</option>
      <option value={Category.Bourbon}>Bourbon</option>
      <option value={Category.Rye}>Rye</option>
      <option value={Category.SingleMalt}>Single Malt</option>
    </select>
  );

  const BottlingYear = (
    <input type="number" placeholder="Year" {...userInput.bottlingYear} />
  );

  const CaskNo = (
    <input
      type="text"
      placeholder="Cask serial no."
      {...userInput.distillCaskNo}
    />
  );

  const CaskType = (
    <input
      type="text"
      placeholder="Olorosso, Bourbon"
      {...userInput.distillCaskType}
    />
  );

  const Distillery = (
    <input
      type="text"
      placeholder="Name of distiller"
      {...userInput.distillerName}
    />
  );

  const DistilleryCountry = (
    <input
      type="text"
      placeholder="ex. Scotland"
      {...userInput.distillerCountry}
    />
  );

  const DistilleryDistrict = (
    <input
      type="text"
      placeholder="ex. Islay"
      {...userInput.distillerDistrict}
    />
  );

  const DistillYear = (
    <input type="number" placeholder="Year" {...userInput.distillYear} />
  );

  const Label = (
    <input type="text" placeholder="Label name" {...userInput.bottleLabel} />
  );

  const Series = (
    <input type="text" placeholder="Series name" {...userInput.series} />
  );

  return (
    <div className={classes.BottlingUserInput}>
      <section>
        <EntryList>
          <Entry name="Label">{Label}</Entry>

          <Entry name="Series">{Series}</Entry>

          <Entry name="Distillery">{Distillery}</Entry>

          <Entry name="Bottled by">{Bottler}</Entry>

          <Entry name="Age">{Age}</Entry>

          <Entry name="Alcohol">{Alcohol}</Entry>

          <Entry name="Category">{BottlingCategory}</Entry>
        </EntryList>
      </section>

      <section>
        <h4>The Whisky</h4>

        <EntryList>
          <Entry name="Date distilled">{DistillYear}</Entry>

          <Entry name="Date bottled">{BottlingYear}</Entry>

          <Entry name="Age">{Age}</Entry>

          <Entry name="Category">{BottlingCategory}</Entry>

          <Entry name="Cask No.">{CaskNo}</Entry>

          <Entry name="Cask type">{CaskType}</Entry>

          <Entry name="Batch No.">{BatchNo}</Entry>

          <Entry name="Alcohol">{Alcohol}</Entry>
        </EntryList>
      </section>

      <section>
        <h4>The Distillery</h4>
        <EntryList>
          <Entry name="Distilled by">{Distillery}</Entry>

          <Entry name="Country">{DistilleryCountry}</Entry>

          <Entry name="District">{DistilleryDistrict}</Entry>
        </EntryList>
      </section>

      <section>
        <h4>The Bottle</h4>

        <EntryList>
          <Entry name="Bottled by">{Bottler}</Entry>

          <Entry name="Bottles produced">{BottlesProduced}</Entry>

          <Entry name="Bottle sizes">{BottleSizes}</Entry>

          <Entry name="Bottle code">{BottleCode}</Entry>

          <Entry name="Barcode">{BottleBarCode}</Entry>
        </EntryList>
      </section>
    </div>
  );
};

export default BottlingUserInput;
