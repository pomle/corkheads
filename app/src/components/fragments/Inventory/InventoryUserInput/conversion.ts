import { Inventory } from "types/Inventory";
import { Entries } from "./types";

export function toEntries(inventory: Inventory): Entries {
  return {
    bottlesOwned: inventory.bottlesOwned?.toString() || "",
  };
}

export function toInventory(entries: Entries): Inventory {
  const inventory: Inventory = {};

  const bottlesOwned = toNumberMaybe(entries.bottlesOwned);
  if (!isNaN(bottlesOwned)) {
    inventory.bottlesOwned = bottlesOwned;
  }

  return inventory;
}

function toNumberMaybe(source: unknown) {
  const maybeNumber = parseFloat(source as string);
  if (isFinite(maybeNumber)) {
    return maybeNumber as number;
  }
  return NaN;
}
