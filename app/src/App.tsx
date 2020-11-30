import React from "react";
import Router from "components/route/Router";
import { SharedStateContext } from "components/context/SharedState";
import { ContextMenuContext } from "components/context/ContextMenuContext";
import { InternationalizationContext } from "components/context/InternationalizationContext";
import { FirebaseContext } from "components/context/FirebaseContext";
import { ObjectStoreContext } from "components/context/ObjectStoreContext";
import { SessionContext } from "components/context/SessionContext";
import * as Sentry from "@sentry/react";

const contexts = [
  FirebaseContext,
  SessionContext,
  ObjectStoreContext,
  ContextMenuContext,
  SharedStateContext,
  InternationalizationContext,
  Router,
].reverse();

const App: React.FC = ({ children }) => {
  return contexts.reduce((stack, Context) => {
    return React.createElement(Context, null, stack);
  }, <>{children}</>);
};

export default Sentry.withProfiler(App);
