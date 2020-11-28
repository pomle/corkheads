export type FieldName =
  | "abv"
  | "age"
  | "bottleCount"
  | "bottledYear"
  | "bottler"
  | "distilledYear"
  | "distillery"
  | "series";

export type Fields<T> = Record<FieldName, T>;

export type Entries = Fields<string>;
