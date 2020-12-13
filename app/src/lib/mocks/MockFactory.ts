import moment from "moment";
import { Bottling } from "types/Bottling";

export function createMockFactory() {
  function createBottling(): Bottling {
    return {
      barcodes: [],
      bottlesProduced: 2033,
      bottleSize: "75cl",
      bottler: {
        name: "Bottlerama",
        country: "Bottleville",
      },
      code: "L-214LA23",
      date: moment("2002-01-03T16:23:32Z"),
      distill: {
        alcoholByVolumePercentage: 48.23241241,
        age: 16,
        batch: {
          number: "Batch No. 123",
        },
        cask: {
          number: "Cask No. 6125",
          type: "Olorosso",
        },
        date: moment("1998-11-23T22:01:11Z"),
        distillery: {
          name: "Brukveda",
          country: "Sweden",
        },
        year: 1724,
      },
      label: "Old Marks",
      series: {
        name: "Serial Drink",
      },
      year: 1923,
    };
  }

  return {
    createBottling,
  };
}
