import { Bottling, createBottling } from "types/Bottling";
import { Entries } from "./types";

export function toEntries(bottling: Bottling): Entries {
  const { distill } = bottling;
  const { distillery } = distill;

  const abv = distill.alcoholByVolumePercentage;

  return {
    abv: abv?.toString() || "",
    age: distill.age?.toString() || "",
    bottleCount: bottling.bottlesProduced?.toString() || "",
    bottlerName: bottling.bottler.name || "",
    bottlerCountry: bottling.bottler.country || "",
    bottleSize: bottling.bottleSize || "",
    bottlingYear: bottling.year?.toString() || "",
    distillBatchNo: distill.batchNo || "",
    distillCaskNo: distill.caskNo || "",
    distillYear: distill.year?.toString() || "",
    distillerCountry: distillery.country || "",
    distillerName: distillery.name || "",
    series: bottling.series.name || "",
  };
}

export function toBottling(entries: Entries): Bottling {
  const bottling = createBottling();

  const alcoholPercentage = toNumberMaybe(entries.abv);
  if (!isNaN(alcoholPercentage)) {
    bottling.distill.alcoholByVolumePercentage = alcoholPercentage;
  }

  const agedTimeYears = toNumberMaybe(entries.age);
  if (!isNaN(agedTimeYears)) {
    bottling.distill.age = agedTimeYears;
  }

  const bottleCount = toNumberMaybe(entries.bottleCount);
  if (!isNaN(bottleCount)) {
    bottling.bottlesProduced = bottleCount;
  }

  const bottleSize = entries.bottleSize;
  if (bottleSize.length) {
    bottling.bottleSize = bottleSize;
  }

  const bottlingYear = toNumberMaybe(entries.bottlingYear);
  if (!isNaN(bottlingYear)) {
    bottling.year = bottlingYear;
  }

  const bottlerName = entries.bottlerName;
  if (bottlerName.length > 0) {
    bottling.bottler.name = bottlerName;
  }

  const bottlerCountry = entries.bottlerCountry;
  if (bottlerCountry.length > 0) {
    bottling.bottler.country = bottlerCountry;
  }

  const distillerName = entries.distillerName;
  if (distillerName.length > 0) {
    bottling.distill.distillery.name = distillerName;
  }

  const distillerCountry = entries.distillerCountry;
  if (distillerCountry.length > 0) {
    bottling.distill.distillery.country = distillerCountry;
  }

  const distillYear = toNumberMaybe(entries.distillYear);
  if (distillYear) {
    bottling.distill.year = distillYear;
  }

  const distillCaskNo = entries.distillCaskNo;
  if (distillCaskNo.length > 0) {
    bottling.distill.caskNo = distillCaskNo;
  }

  const distillBatchNo = entries.distillBatchNo;
  if (distillBatchNo.length > 0) {
    bottling.distill.batchNo = distillBatchNo;
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
