export type Container<T> = {
  id: string;
  data: T;
};

type Snapshot = firebase.firestore.QueryDocumentSnapshot;

export interface Converter<T> {
  toFirestore(data: Container<T>): object;
  fromFirestore(snapshot: Snapshot): Container<T>;
}
