import { useFirebase } from "components/context/FirebaseContext";

export function useStorage() {
  return useFirebase().storage;
}
