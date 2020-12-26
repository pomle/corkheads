export type FieldName = "name" | "username";

export type Fields<T> = Record<FieldName, T>;

export type Entries = Fields<string>;
