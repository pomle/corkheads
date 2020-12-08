export type BarCode = {
  type: "EAN-13" | "UPC-A";
  number: number;
};

export type Distillery = {
  name?: string;
  country?: string;
};

export type Distill = {
  distillery: Distillery;
  age?: number;
  year?: number; // Year it was distilled
  alcoholByVolumePercentage?: number;
  caskNo?: string;
  batchNo?: string;
};

export type Bottler = {
  name?: string;
  country?: string;
};

export type Series = {
  name?: string;
};

export type Bottling = {
  distill: Distill;
  bottler: Bottler;
  series: Series;
  bottleSize?: string;
  bottlesProduced?: number;
  year?: number;
  barcodes: BarCode[]; // Barcodes printed on bottles in this bottling
};

export function createBottling(): Bottling {
  return {
    bottler: {},
    distill: {
      distillery: {},
    },
    series: {},
    barcodes: [],
  };
}
