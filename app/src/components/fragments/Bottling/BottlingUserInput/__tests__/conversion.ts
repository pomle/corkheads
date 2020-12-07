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
});

describe("#toBottling", () => {
  let entries: Entries;

  beforeEach(() => {
    entries = {
      abv: "49.412",
      bottleCount: "233",
      age: "16",
      distilledYear: "2005",
      bottledYear: "2007",
      bottler: "Bottlerama",
      distillery: "Distillerama",
      series: "X-Men Edition",
    };
  });

  it("converts ABV to number", () => {
    const bottling = toBottling(entries);
    expect(bottling.distill.alcoholByVolumePercentage).toEqual(49.412);
  });
});
