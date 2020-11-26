import { firestore } from "firebase/app";

export type Entry<T> = {
  id: string;
  doc: firestore.DocumentReference<T>;
  data: T;
};
