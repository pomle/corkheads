import { firestore } from "firebase/app";

export type DocumentType<T> = {
  [P in keyof T]: T[P] | firestore.FieldValue;
};
