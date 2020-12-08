import { Bottling, createBottling } from "types/Bottling";
import { toBottling, toEntries } from "../conversion";
import { Entries } from "../types";

describe("#toEntries", () => {
  let bottling: Bottling;

  beforeEach(() => {
    bottling = createBottling();
  });

  it("leaves ABV percentage untreated", () => {
    bottling.distill.alcoholByVolumePercentage = 48.23241241;
    const result = toEntries(bottling);
    expect(result.abv).toEqual("48.23241241");
  });

  it("converts age", () => {
    bottling.distill.age = 16;
    const result = toEntries(bottling);
    expect(result.age).toEqual("16");
  });

  it("converts bottle count", () => {
    bottling.bottlesProduced = 2033;
    const result = toEntries(bottling);
    expect(result.bottleCount).toEqual("2033");
  });

  it("converts bottle size", () => {
    bottling.bottleSize = "75cl";
    const result = toEntries(bottling);
    expect(result.bottleSize).toEqual("75cl");
  });

  it("converts bottler name", () => {
    bottling.bottler.name = "Bottlerama";
    const result = toEntries(bottling);
    expect(result.bottlerName).toEqual("Bottlerama");
  });

  it("converts bottler country", () => {
    bottling.bottler.country = "Bottleville";
    const result = toEntries(bottling);
    expect(result.bottlerCountry).toEqual("Bottleville");
  });

  it("converts bottling year", () => {
    bottling.year = 1923;
    const result = toEntries(bottling);
    expect(result.bottlingYear).toEqual("1923");
  });

  it("converts distill batch no", () => {
    bottling.distill.batchNo = "Batch No. 123";
    const result = toEntries(bottling);
    expect(result.distillBatchNo).toEqual("Batch No. 123");
  });

  it("converts distill cask no", () => {
    bottling.distill.caskNo = "Cask No. 6125";
    const result = toEntries(bottling);
    expect(result.distillCaskNo).toEqual("Cask No. 6125");
  });

  it("converts distill year", () => {
    bottling.distill.year = 1724;
    const result = toEntries(bottling);
    expect(result.distillYear).toEqual("1724");
  });

  it("converts distiller country", () => {
    bottling.distill.distillery.country = "Sweden";
    const result = toEntries(bottling);
    expect(result.distillerCountry).toEqual("Sweden");
  });

  it("converts distiller name", () => {
    bottling.distill.distillery.name = "Brukveda";
    const result = toEntries(bottling);
    expect(result.distillerName).toEqual("Brukveda");
  });

  it("converts series name", () => {
    bottling.series.name = "Serial Drink";
    const result = toEntries(bottling);
    expect(result.series).toEqual("Serial Drink");
  });
});

describe("#toBottling", () => {
  let entries: Entries;

  beforeEach(() => {
    entries = {
      abv: "49.412",
      age: "16",
      bottleCount: "233",
      bottlerName: "Bottlerama",
      bottlerCountry: "Islas Buteljas",
      bottleSize: "70cl",
      bottlingYear: "2007",
      distillBatchNo: "Batch No. 1337",
      distillCaskNo: "Cask No. 9",
      distillYear: "2005",
      distillerCountry: "Distillville",
      distillerName: "Distillerama",
      series: "X-Men Edition",
    };
  });

  it("converts ABV to number", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.alcoholByVolumePercentage).toEqual(49.412);
  });

  it("allows ABV to optional", () => {
    entries.abv = "";
    const bottling = toBottling(entries);
    expect(bottling.distill).not.toHaveProperty("alcoholByVolumePercentage");
  });

  it("converts age to number", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.age).toEqual(16);
  });

  it("allows age to be optional", () => {
    entries.age = "";
    const bottling = toBottling(entries);
    expect(bottling.distill).not.toHaveProperty("age");
  });

  it("converts bottle count to number", () => {
    const bottling = toBottling(entries);
    expect(bottling.bottlesProduced).toEqual(233);
  });

  it("allows bottle count to be optional", () => {
    entries.bottleCount = "";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("bottleCount");
  });

  it("finds bottler name", () => {
    const bottling = toBottling(entries);
    expect(bottling.bottler.name).toEqual("Bottlerama");
  });

  it("allows bottler name to be empty", () => {
    entries.bottlerName = "";
    const bottling = toBottling(entries);
    expect(bottling.bottler).not.toHaveProperty("name");
  });

  it("finds bottler country", () => {
    const bottling = toBottling(entries);
    expect(bottling.bottler.country).toEqual("Islas Buteljas");
  });

  it("allows bottler country to be empty", () => {
    entries.bottlerCountry = "";
    const bottling = toBottling(entries);
    expect(bottling.bottler).not.toHaveProperty("country");
  });

  it("finds bottle size", () => {
    const bottling = toBottling(entries);
    expect(bottling.bottleSize).toEqual("70cl");
  });

  it("allows bottle size to be empty", () => {
    entries.bottleSize = "";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("bottleSize");
  });

  it("finds bottling year", () => {
    const bottling = toBottling(entries);
    expect(bottling.year).toEqual(2007);
  });

  it("allows bottling year to be empty", () => {
    entries.bottlingYear = "";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("year");
  });

  it("finds distill batch no", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.batchNo).toEqual("Batch No. 1337");
  });

  it("allows distill batch no to be empty", () => {
    entries.distillBatchNo = "";
    const bottling = toBottling(entries);
    expect(bottling.distill).not.toHaveProperty("batchNo");
  });

  it("finds distill cask no", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.caskNo).toEqual("Cask No. 9");
  });

  it("allows distill cask no to be empty", () => {
    entries.distillCaskNo = "";
    const bottling = toBottling(entries);
    expect(bottling.distill).not.toHaveProperty("caskNo");
  });

  it("finds distill year", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.year).toEqual(2005);
  });

  it("allows distill year to be empty", () => {
    entries.distillYear = "";
    const bottling = toBottling(entries);
    expect(bottling.distill).not.toHaveProperty("year");
  });

  it("finds distillery country", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.distillery.country).toEqual("Distillville");
  });

  it("allows distillery country to be empty", () => {
    entries.distillerCountry = "";
    const bottling = toBottling(entries);
    expect(bottling.distill.distillery).not.toHaveProperty("country");
  });

  it("finds distillery name", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.distillery.name).toEqual("Distillerama");
  });

  it("allows distillery name to be empty", () => {
    entries.distillerName = "";
    const bottling = toBottling(entries);
    expect(bottling.distill.distillery).not.toHaveProperty("name");
  });

  it("finds series", () => {
    const bottling = toBottling(entries);
    expect(bottling.series.name).toEqual("X-Men Edition");
  });

  it("allows series", () => {
    entries.series = "";
    const bottling = toBottling(entries);
    expect(bottling.series).not.toHaveProperty("name");
  });
});
