import { useCallback, useEffect, useMemo, useState } from "react";
import { DocumentType } from "types/DocumentType";
import { useDB } from "../useDB";

export type UserData = {
  displayName?: string;
  photoURL?: string;
  readonly collectionSize?: number;
  readonly wishlistSize?: number;
  readonly checkInCount?: number;
};

const DEFAULT: UserData = {
  checkInCount: 0,
  collectionSize: 0,
  wishlistSize: 0,
};

export function useUserData(
  userId: string
): [UserData, (userData: DocumentType<UserData>) => Promise<void>] {
  const [userData, setUserData] = useState<UserData>(DEFAULT);

  const db = useDB();

  const userRef = useMemo(() => {
    return db.collection("users").doc(userId);
  }, [db, userId]);

  useEffect(() => {
    return userRef.onSnapshot((snapshot) => {
      setUserData(snapshot.data() || DEFAULT);
    });
  }, [userRef]);

  const updateUser = useCallback(
    async (userData: DocumentType<UserData>) => {
      return userRef.set(userData, { merge: true });
    },
    [userRef]
  );

  return [userData, updateUser];
}
