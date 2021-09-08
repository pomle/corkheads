import React from "react";
import ProfileView from "components/views/ProfileView";
import { ViewStack } from "@pomle/react-viewstack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";
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
    communityCheckIns: () => string;
    contributions: () => string;
    friends: () => string;
    notifications: () => void;
    search: () => void;
    settings: () => void;
    toplist: () => string;
    user: (userId: string) => void;
    wishlist: () => string;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({ routes, userId }) => {
  const nav = {
    forward: (
      <NavIcon onClick={routes.settings}>
        <CogIcon />
      </NavIcon>
    ),
  };

  return (
    <ErrorBoundary nav={nav}>
      {() => (
        <ViewStack>
          <ProfileView routes={routes} userId={userId} />
          <FindDrinkOverlayView routes={routes} />
        </ViewStack>
      )}
    </ErrorBoundary>
  );
};

export default ProfilePage;
