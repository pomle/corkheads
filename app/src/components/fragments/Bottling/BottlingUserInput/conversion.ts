import { asABV } from "lib/format/stringify";
import moment from "moment";
import { Moment } from "moment";
import { Bottling, createBottling } from "types/Bottling";
import { Entries } from "./types";

export function toEntries(bottling: Bottling): Entries {
  const { distill } = bottling;
  const { distillery } = distill;

  return {
    abv: distill.alcoholByVolumePercentage
      ? asABV(distill.alcoholByVolumePercentage)
      : "",
    age: distill.age?.toString() || "",
    bottleCode: bottling.code || "",
    bottleCount: bottling.bottlesProduced?.toString() || "",
    bottleLabel: bottling.label || "",
    bottlerName: bottling.bottler.name || "",
    bottlerCountry: bottling.bottler.country || "",
    bottleSize: bottling.bottleSize || "",
    bottlingDate: dateToString(bottling.date),
    bottlingYear: bottling.year?.toString() || "",
    distillBatchNo: distill.batch.number || "",
    distillCaskNo: distill.cask.number || "",
    distillCaskType: distill.cask.type || "",
    distillDate: dateToString(distill.date),
    distillYear: distill.year?.toString() || "",
    distillerCountry: distillery.country || "",
    distillerDistrict: distillery.district || "",
    distillerName: distillery.name || "",
    series: bottling.series.name || "",
  };
}

export function toBottling(entries: Entries): Bottling {
  const bottling = createBottling();

  const alcoholPercentage = fromPercentInput(entries.abv);
  if (!isNaN(alcoholPercentage)) {
    bottling.distill.alcoholByVolumePercentage = alcoholPercentage;
  }

  const agedTimeYears = toNumberMaybe(entries.age);
  if (!isNaN(agedTimeYears)) {
    bottling.distill.age = agedTimeYears;
  }

  const bottleCode = entries.bottleCode;
  if (bottleCode.length) {
    bottling.code = bottleCode;
  }

  const bottleCount = toNumberMaybe(entries.bottleCount);
  if (!isNaN(bottleCount)) {
    bottling.bottlesProduced = bottleCount;
  }

  const bottleLabel = entries.bottleLabel;
  if (bottleLabel.length) {
    bottling.label = bottleLabel;
  }

  const bottleSize = entries.bottleSize;
  if (bottleSize.length) {
    bottling.bottleSize = bottleSize;
  }

  const bottlingYear = toNumberMaybe(entries.bottlingYear);
  if (!isNaN(bottlingYear)) {
    bottling.year = bottlingYear;
  }

  const bottlingDate = toDateMaybe(entries.bottlingDate);
  if (bottlingDate) {
    bottling.date = bottlingDate;
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

  const distillerDistrict = entries.distillerDistrict;
  if (distillerDistrict.length > 0) {
    bottling.distill.distillery.district = distillerDistrict;
  }

  const distillYear = toNumberMaybe(entries.distillYear);
  if (distillYear) {
    bottling.distill.year = distillYear;
  }

  const distillDate = toDateMaybe(entries.distillDate);
  if (distillDate) {
    bottling.distill.date = distillDate;
  }

  const distillCaskNo = entries.distillCaskNo;
  if (distillCaskNo.length > 0) {
    bottling.distill.cask.number = distillCaskNo;
  }

  const distillCaskType = entries.distillCaskType;
  if (distillCaskType.length > 0) {
    bottling.distill.cask.type = distillCaskType;
  }

  const distillBatchNo = entries.distillBatchNo;
  if (distillBatchNo.length > 0) {
    bottling.distill.batch.number = distillBatchNo;
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

function toDateMaybe(source: unknown) {
  const maybeDate = moment(source as string);
  if (maybeDate.isValid()) {
    return maybeDate;
  }
  return undefined;
}

function fromPercentInput(source: unknown) {
  if (typeof source === "string") {
    const text = source.replace(/[^0-9,.]/g, "");
    const decimalized = text.replace(/[,]/g, ".");
    return toNumberMaybe(decimalized);
  }
  return NaN;
}

function dateToString(date?: Moment) {
  if (date) {
    if (date.isValid()) {
      return date.toISOString();
    }
  }
  return "";
}
