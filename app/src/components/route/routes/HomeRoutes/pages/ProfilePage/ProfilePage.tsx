import React from "react";
import ProfileView from "components/views/ProfileView";
import ViewStack from "components/ui/layout/ViewStack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import { ReactComponent as CogIcon } from "assets/graphics/icons/cog.svg";
import NavIcon from "components/ui/trigger/NavIcon";

interface ProfilePageProps {
  userId: string;
  routes: {
    article: (articleId: string) => void;
    checkIn: (checkInId: string) => void;
    checkIns: () => string;
    collection: () => string;
    search: () => void;
    settings: () => void;
    toplist: () => string;
    wishlist: () => string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ routes, userId }) => {
  const nav = (
    <NavigationBar
      forward={
        <NavIcon onClick={routes.settings}>
          <CogIcon />
        </NavIcon>
      }
    />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => (
        <ViewStack>
          <ProfileView nav={nav} routes={routes} userId={userId} />
          <FindDrinkOverlayView routes={routes} />
        </ViewStack>
      )}
    </ErrorBoundary>
  );
};

export default ProfilePage;
