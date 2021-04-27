import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ViewStack from "components/ui/layout/ViewStack";
import Slide, { SlideDirection } from "components/ui/transitions/Slide";
import AuthenticationView from "components/views/AuthenticationView";
import ContextMenuView from "components/views/ContextMenuView/ContextMenuView";
import PopupDialogView from "components/views/PopupDialogView";
import RootRoutes from "components/route/routes/HomeRoutes";
import { useFirebase } from "components/context/FirebaseContext";
import { useMe } from "components/hooks/useMe";
import config from "config/app.config.js";
import { ScreenContext } from "components/context/ScreenContext";
import { createPath } from "lib/path";

const rootPath = createPath("/", {});

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
        <ScreenContext originPath={rootPath} mountPath={rootPath}>
          <RootRoutes />
        </ScreenContext>

        <Slide direction={SlideDirection.Down} active={!user}>
          <AuthenticationView />
        </Slide>
      </ViewStack>
      <ContextMenuView />
    </PopupDialogView>
  );
};

export default AppRoute;
