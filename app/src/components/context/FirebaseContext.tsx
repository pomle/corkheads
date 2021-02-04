import React, { createContext, useContext, useMemo } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "config/firebase.config.json";

export const Context = createContext<ReturnType<
  typeof createFirebaseContext
> | null>(null);

function createApp() {
  return firebase.initializeApp(config);
}

const app = createApp();

function createFirebaseContext(app: firebase.app.App) {
  return {
    auth: app.auth(),
    firestore: app.firestore(),
    storage: app.storage(),
  };
}

export const FirebaseContext: React.FC = ({ children }) => {
  const value = useMemo(() => createFirebaseContext(app), []);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export function useFirebase() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("useFirebase without FirebaseContext");
  }
  return value;
}
