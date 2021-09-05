import { useFirebase } from "components/context/FirebaseContext";

export function useAuth() {
  return useFirebase().auth;
}
