import React from "react";
import ViewStack from "components/ui/layout/ViewStack";
import Slide, { SlideDirection } from "components/ui/transitions/Slide";
import AuthenticationView from "components/views/AuthenticationView";
import OfflineView from "components/views/OfflineView/OfflineView";
import ContextMenuView from "components/views/ContextMenuView/ContextMenuView";
import { useOnlineStatus } from "components/hooks/useOnlineStatus";
import { useUser } from "components/hooks/useUser";

const AppRoute: React.FC = ({ children }) => {
  const user = useUser();
  const isOnline = useOnlineStatus();

  return (
    <ViewStack>
      <>{children}</>
      <Slide direction={SlideDirection.Down} active={!user}>
        <AuthenticationView />
      </Slide>
      <Slide direction={SlideDirection.Down} active={!isOnline}>
        <OfflineView />
      </Slide>
      <ContextMenuView />
    </ViewStack>
  );
};

export default AppRoute;
