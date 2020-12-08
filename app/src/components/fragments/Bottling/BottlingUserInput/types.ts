export type FieldName =
  | "abv"
  | "age"
  | "bottleCount"
  | "bottlerName"
  | "bottlerCountry"
  | "bottleSize"
  | "bottlingYear"
  | "distillBatchNo"
  | "distillCaskNo"
  | "distillYear"
  | "distillerCountry"
  | "distillerName"
  | "series";

export type Fields<T> = Record<FieldName, T>;

export type Entries = Fields<string>;
