import { firestore } from "firebase";

export type DocumentType<T> = {
  [P in keyof T]: T[P] | firestore.FieldValue;
};
