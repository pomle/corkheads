import React, { useRef } from "react";
import { useMe } from "components/hooks/useMe";
import ProfileView from "components/views/ProfileView";
import ViewStack from "components/ui/layout/ViewStack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";
import NavigationBar from "components/ui/layout/NavigationBar";
import LoadingView from "components/views/LoadingView";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import NavButton from "components/ui/trigger/NavButton";

interface ProfilePageProps {
  routes: {
    back: () => void;
    settings: () => void;
    collection: () => string;
    checkIns: () => string;
    toplist: () => string;
    wishlist: () => string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ routes }) => {
  const element = useRef<React.ReactElement>();

  const user = useMe();

  const nav = (
    <NavigationBar
      forward={
        <NavButton icon={null} onClick={routes.settings}>
          Settings
        </NavButton>
      }
    />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (user) {
          element.current = (
            <ViewStack>
              <ProfileView nav={nav} routes={routes} userId={user.id} />
              <FindDrinkOverlayView />
            </ViewStack>
          );
        }

        if (!element.current) {
          return <LoadingView nav={nav} />;
        }

        return element.current;
      }}
    </ErrorBoundary>
  );
};

export default ProfilePage;
