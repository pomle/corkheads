import { useEffect, useMemo, useState } from "react";
import { useFirebase } from "components/context/FirebaseContext";

export function useAuth() {
  const firebase = useFirebase();

  const [user, setUser] = useState<firebase.User>();

  const auth = useMemo(() => firebase.auth(), [firebase]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, [auth]);

  return useMemo(
    () => ({
      auth,
      user,
    }),
    [auth, user]
  );
}
