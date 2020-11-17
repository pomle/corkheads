export type Container<T> = {
  id: string;
  data: T;
};

type Snapshot = firebase.firestore.QueryDocumentSnapshot;

export interface Converter<T> {
  toFirestore(data: Container<T>): firebase.firestore.DocumentData;
  fromFirestore(snapshot: Snapshot): Container<T>;
}

export function clone<T>(container: Container<T>): Container<T> {
  return {
    id: container.id,
    data: {
      ...container.data,
    },
  };
}
