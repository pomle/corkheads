import { Distill, Distillery } from "types/Bottling";

export type v2 = Distill;

export type v1 = {
  distillery: Distillery;
  age?: number;
  year?: number; // Year it was distilled
  alcoholByVolumeFraction?: number;
};
