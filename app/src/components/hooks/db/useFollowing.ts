import { useCallback, useEffect, useMemo, useState } from "react";
import { firestore } from "firebase/app";
import { useUserCollection } from "./useCollection";

export type UserEntry = {
  userId: string;
};

const EMPTY = new Map<string, UserEntry>();

export function useFollowing(userId: string) {
  const collection = useUserCollection(userId).userFollowing;

  const [users, setUsers] = useState<Map<string, UserEntry>>(EMPTY);

  const add = useCallback(
    (userId: string) => {
      collection.doc(userId).set({
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    },
    [collection]
  );

  const remove = useCallback(
    (userId: string) => {
      collection.doc(userId).delete();
    },
    [collection]
  );

  useEffect(() => {
    return collection.onSnapshot((snapshot) => {
      const entries = new Map<string, UserEntry>();
      snapshot.forEach((snap) => {
        entries.set(snap.id, {
          userId: snap.id,
        });
      });
      setUsers(entries);
    });
  }, [collection]);

  return useMemo(
    () => ({
      users,
      add,
      remove,
    }),
    [users, add, remove]
  );
}
