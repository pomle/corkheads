import { useCallback, useEffect, useMemo, useState } from "react";
import { useDB } from "../useDB";

type UserData = {
  photoURL?: string;
};

const EMPTY = Object.create(null);

export function useUserData(
  userId: string
): [UserData, (userData: UserData) => Promise<void>] {
  const [userData, setUserData] = useState<UserData>(EMPTY);

  const db = useDB();

  const userRef = useMemo(() => {
    return db.collection("users").doc(userId);
  }, [db, userId]);

  useEffect(() => {
    return userRef.onSnapshot((snapshot) => {
      setUserData(snapshot.data() || EMPTY);
    });
  }, [userRef]);

  const updateUser = useCallback(
    async (userData: UserData) => {
      return userRef.set(userData);
    },
    [userRef]
  );

  return [userData, updateUser];
}