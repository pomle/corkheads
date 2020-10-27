import React, { createContext, useContext } from "react";
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import config from "firebase.config.json";

export const Context = createContext<firebase.app.App | null>(
  null
);

function createApp() {
    return firebase.initializeApp(config);
}

const app = createApp();

export const FirebaseContext: React.FC = ({ children }) => {
  return <Context.Provider value={app}>{children}</Context.Provider>;
};

export function useFirebase() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error(
      "useFirebase without FirebaseContext"
    );
  }
  return value;
}
