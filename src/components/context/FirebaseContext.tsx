import React, { createContext, useContext } from "react";
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

export const Context = createContext<firebase.app.App | null>(
  null
);

function createApp() {
    const firebaseConfig = {
        apiKey: "AIzaSyDI8MJVGlBvld2kxMVwiiQt2rqEgxjB368",
        authDomain: "corkheads-e9bcb.firebaseapp.com",
        databaseURL: "https://corkheads-e9bcb.firebaseio.com",
        projectId: "corkheads-e9bcb",
        storageBucket: "corkheads-e9bcb.appspot.com",
        messagingSenderId: "883288542166",
        appId: "1:883288542166:web:132de2b1a2d6a12f75b277",
        measurementId: "G-68X39M149Y"
      };

    return firebase.initializeApp(firebaseConfig);
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
