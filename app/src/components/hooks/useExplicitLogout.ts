import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useExplicitLogout = () => {
  const history = useHistory();
  const auth = useAuth();

  return useCallback(async () => {
    await auth.signOut();
    history.push("/");
  }, [auth, history]);
};
