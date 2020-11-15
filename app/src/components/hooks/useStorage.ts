import { useMemo } from "react";
import { useFirebase } from "components/context/FirebaseContext";

export function useStorage() {
  const firebase = useFirebase();
  return useMemo(() => firebase.storage(), [firebase]);
}
