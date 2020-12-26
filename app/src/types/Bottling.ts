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
  age?: number;
  alcoholByVolumePercentage?: number;
  batch: Batch;
  cask: Cask;
  date?: Moment; // Date it was distilled
  distillery: Distillery;
  year?: number; // Year it was distilled
};

export type Bottler = {
  name?: string;
  country?: string;
};

export type Series = {
  name?: string;
};

export type Bottling = {
  barcodes: BarCode[]; // Barcodes printed on bottles in this bottling
  bottler: Bottler;
  bottleSize?: string;
  bottlesProduced?: number;
  category?: Category;
  code?: string;
  date?: Moment;
  displayName?: string;
  distill: Distill;
  label?: string;
  series: Series;
  year?: number;
};

export function createBottling(): Bottling {
  return {
    barcodes: [],
    bottler: {},
    distill: {
      batch: {},
      cask: {},
      distillery: {},
    },
    series: {},
  };
}
