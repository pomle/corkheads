import React from "react";
import ViewStack from "components/ui/layout/ViewStack";
import Slide, { SlideDirection } from "components/ui/transitions/Slide";
import AuthenticationView from "components/views/AuthenticationView";
import ContextMenuView from "components/views/ContextMenuView/ContextMenuView";
import RootRoutes from "components/route/routes/RootRoutes";
import { useUser } from "components/hooks/useUser";

const AppRoute: React.FC = () => {
  const user = useUser();

  return (
    <ViewStack>
      <RootRoutes />
      <Slide direction={SlideDirection.Down} active={!user}>
        <AuthenticationView />
      </Slide>
      <ContextMenuView />
    </ViewStack>
  );
};

export default AppRoute;
