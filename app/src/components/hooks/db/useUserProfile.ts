import { useCallback, useEffect, useMemo, useState } from "react";
import { DocumentType } from "types/DocumentType";
import { createUser, User } from "types/User";
import { useDB } from "../useDB";

export function useUserProfile(userId: string) {
  const initial = useMemo(() => createUser(userId), [userId]);

  const [user, setUser] = useState<User>(initial);

  const db = useDB();

  const userRef = useMemo(() => {
    return db.collection("users").doc(userId);
  }, [db, userId]);

  useEffect(() => {
    return userRef.onSnapshot((snapshot) => {
      setUser((snapshot.data() as User) || initial);
    });
  }, [initial, userRef]);

  const updateProfile = useCallback(
    (profile: DocumentType<User["profile"]>) => {
      return userRef.set({ profile }, { merge: true });
    },
    [userRef]
  );

  return useMemo(
    () => ({
      user,
      updateProfile,
    }),
    [user, updateProfile]
  );
}
