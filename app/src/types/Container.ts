import { firestore } from "firebase/app";

export type Entry<T> = {
  id: string;
  data: T;
  ref: firestore.DocumentReference<T>;
  metadata: firestore.SnapshotMetadata;
};

export function toEntry<T>(
  snapshot: firestore.DocumentSnapshot<T>
): Entry<T> | null {
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
