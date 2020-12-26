import moment from "moment";
import { Bottling, Category } from "types/Bottling";
import { createMockFactory } from "lib/mocks/MockFactory";
import { toBottling, toEntries } from "../conversion";
import { Entries } from "../types";

const mocks = createMockFactory();

describe("#toEntries", () => {
  let bottling: Bottling;

  beforeEach(() => {
    bottling = mocks.createBottling();
  });

  it("converts ABV percentage to .1 with percent sign", () => {
    bottling.distill.alcoholByVolumePercentage = 48.23241241;
    const result = toEntries(bottling);
    expect(result.abv).toEqual("48.2%");
  });

  it("converts age", () => {
    bottling.distill.age = 16;
    const result = toEntries(bottling);
    expect(result.age).toEqual("16");
  });

  it("converts bottle code", () => {
    bottling.code = "L-214LA23";
    const result = toEntries(bottling);
    expect(result.bottleCode).toEqual("L-214LA23");
  });

  it("converts bottle count", () => {
    bottling.bottlesProduced = 2033;
    const result = toEntries(bottling);
    expect(result.bottleCount).toEqual("2033");
  });

  it("converts bottle label", () => {
    bottling.label = "Old Marks";
    const result = toEntries(bottling);
    expect(result.bottleLabel).toEqual("Old Marks");
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

  it("converts bottling date", () => {
    bottling.date = moment("2002-01-03T16:23:32Z");
    const result = toEntries(bottling);
    expect(result.bottlingDate).toEqual("2002-01-03T16:23:32.000Z");
  });

  it("handles unset bottling date", () => {
    bottling.date = undefined;
    const result = toEntries(bottling);
    expect(result.bottlingDate).toEqual("");
  });

  it("converts category", () => {
    bottling.category = Category.Bourbon;
    const result = toEntries(bottling);
    expect(result.category).toEqual("Bourbon");
  });

  it("handles unset category", () => {
    bottling.category = undefined;
    const result = toEntries(bottling);
    expect(result.category).toEqual("");
  });

  it("converts distill batch no", () => {
    bottling.distill.batch.number = "Batch No. 123";
    const result = toEntries(bottling);
    expect(result.distillBatchNo).toEqual("Batch No. 123");
  });

  it("converts distill cask no", () => {
    bottling.distill.cask.number = "Cask No. 6125";
    const result = toEntries(bottling);
    expect(result.distillCaskNo).toEqual("Cask No. 6125");
  });

  it("converts distill cask type", () => {
    bottling.distill.cask.type = "Olorosso";
    const result = toEntries(bottling);
    expect(result.distillCaskType).toEqual("Olorosso");
  });

  it("converts distill year", () => {
    bottling.distill.year = 1724;
    const result = toEntries(bottling);
    expect(result.distillYear).toEqual("1724");
  });

  it("converts distill date", () => {
    bottling.distill.date = moment("1998-11-23T22:01:11Z");
    const result = toEntries(bottling);
    expect(result.distillDate).toEqual("1998-11-23T22:01:11.000Z");
  });

  it("handles unset distill date", () => {
    bottling.distill.date = undefined;
    const result = toEntries(bottling);
    expect(result.distillDate).toEqual("");
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
      bottleCode: "12-3L231",
      bottleCount: "233",
      bottleLabel: "Grant's",
      bottlerName: "Bottlerama",
      bottlerCountry: "Islas Buteljas",
      bottleSize: "70cl",
      bottlingDate: "1744-07-15",
      bottlingYear: "2007",
      category: "Bourbon",
      displayName: "My Big Bottle of Bless Juice",
      distillBatchNo: "Batch No. 1337",
      distillCaskNo: "Cask No. 9",
      distillCaskType: "Olorosso",
      distillDate: "2005-01-23",
      distillYear: "2005",
      distillerCountry: "Distillville",
      distillerDistrict: "Islay",
      distillerName: "Distillerama",
      series: "X-Men Edition",
    };
  });

  describe("ABV", () => {
    it("is converted to number", () => {
      const bottling = toBottling(entries);
      expect(bottling.distill.alcoholByVolumePercentage).toEqual(49.412);
    });

    it("accepts % sign in it but ignores it", () => {
      entries.abv = "%43";
      expect(toBottling(entries).distill.alcoholByVolumePercentage).toEqual(
        43.0
      );

      entries.abv = "4%3";
      expect(toBottling(entries).distill.alcoholByVolumePercentage).toEqual(
        43.0
      );

      entries.abv = "43%";
      expect(toBottling(entries).distill.alcoholByVolumePercentage).toEqual(
        43.0
      );

      entries.abv = "43.5%";
      expect(toBottling(entries).distill.alcoholByVolumePercentage).toEqual(
        43.5
      );

      entries.abv = "43%.5%";
      expect(toBottling(entries).distill.alcoholByVolumePercentage).toEqual(
        43.5
      );

      entries.abv = "4%%%3%.5%";
      expect(toBottling(entries).distill.alcoholByVolumePercentage).toEqual(
        43.5
      );
    });

    it("accepts , as decimal sign", () => {
      entries.abv = "43,5";
      expect(toBottling(entries).distill.alcoholByVolumePercentage).toEqual(
        43.5
      );
    });

    it("is allowed to be optional", () => {
      entries.abv = "";
      const bottling = toBottling(entries);
      expect(bottling.distill).not.toHaveProperty("alcoholByVolumePercentage");
    });
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

  it("finds bottle code", () => {
    const bottling = toBottling(entries);
    expect(bottling.code).toEqual("12-3L231");
  });

  it("allows bottle code to be optional", () => {
    entries.bottleCode = "";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("code");
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

  it("finds bottle label", () => {
    const bottling = toBottling(entries);
    expect(bottling.label).toEqual("Grant's");
  });

  it("allows bottle label to be optional", () => {
    entries.bottleLabel = "";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("label");
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

  it("finds bottling date", () => {
    const bottling = toBottling(entries);
    expect(moment("1744-07-15T00:00:00.000Z").isSame(bottling.date)).toBe(true);
  });

  it("allows bottling date to be empty", () => {
    entries.bottlingDate = "";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("date");
  });

  it("converts category to enum", () => {
    entries.category = "SingleMalt";
    const bottling = toBottling(entries);
    expect(bottling.category).toBe(Category.SingleMalt);
  });

  it("allows category to be empty", () => {
    entries.category = "";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("category");
  });

  it("finds display name", () => {
    const bottling = toBottling(entries);
    expect(bottling.displayName).toEqual("My Big Bottle of Bless Juice");
  });

  it("allows display name to be empty", () => {
    entries.displayName = " ";
    const bottling = toBottling(entries);
    expect(bottling).not.toHaveProperty("displayName");
  });

  it("finds distill batch no", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.batch.number).toEqual("Batch No. 1337");
  });

  it("allows distill batch no to be empty", () => {
    entries.distillBatchNo = "";
    const bottling = toBottling(entries);
    expect(bottling.distill).not.toHaveProperty("batchNo");
  });

  it("finds distill cask no", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.cask.number).toEqual("Cask No. 9");
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

  it("finds distill date", () => {
    const bottling = toBottling(entries);
    expect(
      moment("2005-01-23T00:00:00.000Z").isSame(bottling.distill.date)
    ).toBe(true);
  });

  it("allows distill date to be empty", () => {
    entries.distillDate = "";
    const bottling = toBottling(entries);
    expect(bottling.distill).not.toHaveProperty("date");
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

  it("finds distillery district", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.distillery.district).toEqual("Islay");
  });

  it("allows distillery district to be empty", () => {
    entries.distillerDistrict = "";
    const bottling = toBottling(entries);
    expect(bottling.distill.distillery).not.toHaveProperty("district");
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
