export type FieldName =
  | "abv"
  | "age"
  | "bottleCode"
  | "bottleCount"
  | "bottleLabel"
  | "bottlerName"
  | "bottlerCountry"
  | "bottleSize"
  | "bottlingDate"
  | "bottlingYear"
  | "category"
  | "displayName"
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
