import { useCallback, useEffect, useMemo, useState } from "react";
import { DocumentType } from "types/DocumentType";
import { useDB } from "../useDB";

export type Profile = {
  displayName?: string;
  photoURL?: string;
};

export type UserData = {
  profile?: Profile;
  readonly collectionSize?: number;
  readonly wishlistSize?: number;
  readonly checkInCount?: number;
};

const DEFAULT: UserData = {
  checkInCount: 0,
  collectionSize: 0,
  wishlistSize: 0,
};

export function useUserData(userId: string) {
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

  const updateProfile = useCallback(
    (profile: DocumentType<Profile>) => {
      return userRef.set({ profile }, { merge: true });
    },
    [userRef]
  );

  return useMemo(
    () => ({
      userData,
      updateProfile,
    }),
    [userData, updateProfile]
  );
}
