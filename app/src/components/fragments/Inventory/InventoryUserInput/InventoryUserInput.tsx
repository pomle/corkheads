import React, { useMemo } from "react";
import EntryList from "components/ui/layout/EntryList";
import Entry from "components/ui/layout/Entry";
import { Inventory } from "types/Inventory";
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
  const entries = useMemo(() => {
    return toEntries(inventory);
  }, [inventory]);

  const userInput = useUserInput(entries, (entries) => {
    onChange(toInventory(entries));
  });

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
