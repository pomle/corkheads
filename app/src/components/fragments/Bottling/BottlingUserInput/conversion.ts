import { Bottling, createBottling } from "types/Bottling";
import { Entries } from "./types";

export function toEntries(bottling: Bottling): Entries {
  const { distill } = bottling;

  const abvF = distill?.alcoholByVolumeFraction;

  return {
    abv: typeof abvF === "number" ? (abvF * 100).toFixed(0) : "",
    age: distill.age?.toString() || "",
    bottler: bottling.bottler.name || "",
    bottledYear: bottling.year?.toString() || "",
    bottleCount: bottling.bottlesProduced?.toString() || "",
    distillery: distill.distillery.name || "",
    distilledYear: distill.year?.toString() || "",
    series: bottling.series.name || "",
  };
}

export function toBottling(entries: Entries): Bottling {
  const bottling = createBottling();

  const alcoholPercentage = toNumberMaybe(entries.abv);
  if (!isNaN(alcoholPercentage)) {
    bottling.distill.alcoholByVolumeFraction = alcoholPercentage / 100;
  }

  const agedTimeYears = toNumberMaybe(entries.age);
  if (!isNaN(agedTimeYears)) {
    bottling.distill.age = agedTimeYears;
  }

  const bottleCount = toNumberMaybe(entries.bottleCount);
  if (!isNaN(bottleCount)) {
    bottling.bottlesProduced = bottleCount;
  }

  const bottledYear = toNumberMaybe(entries.bottledYear);
  if (!isNaN(bottledYear)) {
    bottling.year = bottledYear;
  }

  const bottlerName = entries.bottler;
  if (bottlerName.length > 0) {
    bottling.bottler.name = bottlerName;
  }

  const distilledYear = toNumberMaybe(entries.distilledYear);
  if (distilledYear) {
    bottling.distill.year = distilledYear;
  }

  const distilleryName = entries.distillery;
  if (distilleryName.length > 0) {
    bottling.distill.distillery.name = distilleryName;
  }

  const seriesName = entries.series;
  if (seriesName.length > 0) {
    bottling.series.name = seriesName;
  }

  return bottling;
}

function toNumberMaybe(source: unknown) {
  const maybeNumber = parseFloat(source as string);
  if (isFinite(maybeNumber)) {
    return maybeNumber as number;
  }
  return NaN;
}
