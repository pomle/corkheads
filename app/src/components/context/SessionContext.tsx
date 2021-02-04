import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useFirebase } from "components/context/FirebaseContext";

type SessionContextValue = {
  ready: boolean;
  auth: firebase.auth.Auth;
  user?: firebase.User;
};

const Context = createContext<SessionContextValue | null>(null);

export const SessionContext: React.FC = ({ children }) => {
  const { auth } = useFirebase();

  const [ready, setReady] = useState<boolean>(false);
  const [user, setUser] = useState<firebase.User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
      setReady(true);
    });
    return unsubscribe;
  }, [auth]);

  const value = useMemo(
    () => ({
      ready,
      auth,
      user,
    }),
    [ready, auth, user]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useSession() {
  const session = useContext(Context);
  if (!session) {
    throw new Error("useSession without SessionContext");
  }
  return session;
}
