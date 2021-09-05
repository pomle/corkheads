import React from "react";
import { useFirebase } from "components/context/FirebaseContext";
import { FirebaseAuthContext, useFirebaseAuth } from "@pomle/react-firebase";

export const SessionContext: React.FC = ({ children }) => {
  const { auth } = useFirebase();

  return <FirebaseAuthContext auth={auth}>{children}</FirebaseAuthContext>;
};

export function useSession() {
  return useFirebaseAuth();
}
