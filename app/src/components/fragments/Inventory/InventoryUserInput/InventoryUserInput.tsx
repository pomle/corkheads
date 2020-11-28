import React, { useEffect, useMemo, useState } from "react";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { Inventory } from "types/Inventory";
import { Entries } from "./types";
import { toInventory, toEntries } from "./conversion";
import { useUserInput } from "components/hooks/useUserInput";

interface InventoryUserInputProps {
  inventory: Inventory;
  onChange: (inventory: Inventory) => void;
}

const InventoryUserInput: React.FC<InventoryUserInputProps> = ({
  inventory,
  onChange,
}) => {
  const initial = useMemo(() => {
    return toEntries(inventory);
  }, [inventory]);

  const state = useState<Entries>(initial);
  const userInput = useUserInput(state);

  const [entries] = state;
  useEffect(() => {
    onChange(toInventory(entries));
  }, [entries, onChange]);

  return (
    <EntryList>
      <Entry name="Bottles owned">
        <input
          type="number"
          placeholder="# of bottles"
          {...userInput.bottlesOwned}
        />
      </Entry>
    </EntryList>
  );
};

export default InventoryUserInput;
