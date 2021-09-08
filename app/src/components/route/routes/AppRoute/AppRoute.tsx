import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ViewStack } from "@pomle/react-viewstack";
import Slide, { SlideDirection } from "components/ui/transitions/Slide";
import AuthenticationView from "components/views/AuthenticationView";
import ContextMenuView from "components/views/ContextMenuView/ContextMenuView";
import PopupDialogView from "components/views/PopupDialogView";
import RootRoutes from "components/route/routes/RootRoutes";
import { useFirebase } from "components/context/FirebaseContext";
import { useMe } from "components/hooks/useMe";
import config from "config/app.config.js";

const AppRoute: React.FC = () => {
  const user = useMe();

  const history = useHistory();
  const { analytics } = useFirebase();

  useEffect(() => {
    analytics.setUserId(user ? user.id : "anonymous");
  }, [analytics, user]);

  useEffect(() => {
    return history.listen((location) => {
      analytics.logEvent("screen_view", {
        screen_name: location.pathname,
        app_name: "Corkheads",
        app_env: config.environment,
        app_version: config.version,
      });
    });
  }, [analytics, history]);

  return (
    <PopupDialogView>
      <ViewStack>
        <RootRoutes />

        <Slide direction={SlideDirection.Down} active={!user}>
          <AuthenticationView />
        </Slide>
      </ViewStack>
      <ContextMenuView />
    </PopupDialogView>
  );
};

export default AppRoute;
