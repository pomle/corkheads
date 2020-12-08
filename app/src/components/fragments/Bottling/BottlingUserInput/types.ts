export type FieldName =
  | "abv"
  | "age"
  | "bottleCount"
  | "bottleLabel"
  | "bottlerName"
  | "bottlerCountry"
  | "bottleSize"
  | "bottlingDate"
  | "bottlingYear"
  | "distillBatchNo"
  | "distillCaskNo"
  | "distillCaskType"
  | "distillDate"
  | "distillYear"
  | "distillerCountry"
  | "distillerDistrict"
  | "distillerName"
  | "series";

export type Fields<T> = Record<FieldName, T>;

export type Entries = Fields<string>;
