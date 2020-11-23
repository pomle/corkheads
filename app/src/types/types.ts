import { firestore } from "firebase/app";

export interface Converter<T> extends firestore.FirestoreDataConverter<T> {
  toFirestore(data: T): firestore.DocumentData;
  fromFirestore(snapshot: firestore.QueryDocumentSnapshot): T;
}

export function createConverter<T extends { id: string }>({
  to,
  from,
}: {
  to: (source: T) => firestore.DocumentData;
  from: (source: firestore.QueryDocumentSnapshot) => T;
}): Converter<T> {
  const converter: Converter<T> = {
    toFirestore(source) {
      const output = to(source);
      delete output.id;
      return output;
    },

    fromFirestore(snapshot) {
      const output = from(snapshot);
      output.id = snapshot.id;
      return output;
    },
  };

  return converter;
}
