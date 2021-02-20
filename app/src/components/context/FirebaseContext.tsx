import React, { createContext, useContext } from "react";
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import config from "config/firebase.config.json";

export const Context = createContext<ReturnType<
  typeof createFirebaseContext
> | null>(null);

firebase.initializeApp(config);
firebase.firestore().enablePersistence();

const app = firebase.app();

function createFirebaseContext(app: firebase.app.App) {
  return {
    analytics: app.analytics(),
    auth: app.auth(),
    firestore: app.firestore(),
    storage: app.storage(),
  };
}

const context = createFirebaseContext(app);

export const FirebaseContext: React.FC = ({ children }) => {
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export function useFirebase() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error("useFirebase without FirebaseContext");
  }
  return value;
}
