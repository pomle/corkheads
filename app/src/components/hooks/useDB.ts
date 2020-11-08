import { useMemo } from "react";
import { useFirebase } from "components/context/FirebaseContext";

export function useDB() {
  const firebase = useFirebase();
  return useMemo(() => firebase.firestore(), [firebase]);
}
