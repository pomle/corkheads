import React from "react";
import { SharedStateContext } from "@pomle/use-local-storage";
import Router from "components/route/Router";
import { ContextMenuContext } from "components/context/ContextMenuContext";
import { InternationalizationContext } from "components/context/InternationalizationContext";
import { FirebaseContext } from "components/context/FirebaseContext";
import { FirebaseStoreContext } from "@pomle/react-firebase";
import { PopupDialogContext } from "components/context/PopupDialogContext";
import { SessionContext } from "components/context/SessionContext";
import * as Sentry from "@sentry/react";

const contexts = [
  SharedStateContext,
  FirebaseContext,
  FirebaseStoreContext,
  SessionContext,
  ContextMenuContext,
  InternationalizationContext,
  PopupDialogContext,
  Router,
].reverse();

const App: React.FC = ({ children }) => {
  return contexts.reduce((stack, Context) => {
    return React.createElement(Context, null, stack);
  }, <>{children}</>);
};

export default Sentry.withProfiler(App);
