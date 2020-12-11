import { firestore } from "firebase/app";

export type Entry<T> = {
  id: string;
  doc: firestore.DocumentReference<T>;
  data?: T;
};

export type GuaranteedEntry<T> = {
  id: string;
  doc: firestore.DocumentReference<T>;
  data: T;
};

export function isGuaranteed<T>(entry: Entry<T>): entry is GuaranteedEntry<T> {
  return entry.data !== undefined;
}
