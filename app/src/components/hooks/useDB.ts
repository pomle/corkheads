import { useFirebase } from "components/context/FirebaseContext";

export function useDB() {
  return useFirebase().firestore;
}
