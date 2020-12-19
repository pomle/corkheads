import { Moment } from "moment";

export type BarCode = {
  type: "EAN-13" | "UPC-A";
  number: number;
};

export type Distillery = {
  name?: string;
  country?: string;
  district?: string;
};

export type Cask = {
  type?: string;
  number?: string;
};

export enum Category {
  Blended = "Blended",
  Bourbon = "Bourbon",
  Rye = "Rye",
  SingleMalt = "SingleMalt",
}

export type Batch = {
  number?: string;
};

export type Distill = {
  distillery: Distillery;
  age?: number;
  year?: number; // Year it was distilled
  date?: Moment; // Date it was distilled
  alcoholByVolumePercentage?: number;
  cask: Cask;
  batch: Batch;
};

export type Bottler = {
  name?: string;
  country?: string;
};

export type Series = {
  name?: string;
};

export type Bottling = {
  label?: string;
  distill: Distill;
  bottler: Bottler;
  category?: Category;
  series: Series;
  code?: string;
  bottleSize?: string;
  bottlesProduced?: number;
  year?: number;
  date?: Moment;
  barcodes: BarCode[]; // Barcodes printed on bottles in this bottling
};

export function createBottling(): Bottling {
  return {
    bottler: {},
    distill: {
      batch: {},
      cask: {},
      distillery: {},
    },
    series: {},
    barcodes: [],
  };
}
