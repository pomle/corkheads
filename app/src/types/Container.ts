import { firestore } from "firebase/app";

export type Container<T> = {
  id: string;
  data: T;
  ref: firestore.DocumentReference<T>;
  metadata: firestore.SnapshotMetadata;
};

export function toContainer<T>(
  snapshot: firestore.DocumentSnapshot<T>
): Container<T> | null {
  const data = snapshot.data();
  if (!data) {
    return null;
  }

  return {
    id: snapshot.id,
    data,
    ref: snapshot.ref,
    metadata: snapshot.metadata,
  };
}
