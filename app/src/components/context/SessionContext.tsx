import React from "react";
import { useFirebase } from "components/context/FirebaseContext";
import { FirebaseUserContext, useFirebaseUser } from "@pomle/react-firebase";

export const SessionContext: React.FC = ({ children }) => {
  const { auth } = useFirebase();

  return <FirebaseUserContext auth={auth}>{children}</FirebaseUserContext>;
};

export function useSession() {
  return useFirebaseUser();
}
