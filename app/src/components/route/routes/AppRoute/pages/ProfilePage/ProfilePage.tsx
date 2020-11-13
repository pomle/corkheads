import React, { useRef } from "react";
import { useUser } from "components/hooks/useUser";
import ProfileView from "components/views/ProfileView";
import ViewStack from "components/ui/layout/ViewStack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";
import NavigationBar from "components/ui/layout/NavigationBar";
import LoadingView from "components/views/LoadingView";

const ProfilePage: React.FC = () => {
  const element = useRef<React.ReactElement>();

  const user = useUser();

  const signOut = useExplicitLogout();

  const nav = (
    <NavigationBar forward={<button onClick={signOut}>Log out</button>} />
  );

  if (user) {
    element.current = (
      <ViewStack>
        <ProfileView nav={nav} user={user} />
        <FindDrinkOverlayView />
      </ViewStack>
    );
  }

  if (!element.current) {
    return <LoadingView nav={nav} />;
  }

  return element.current;
};

export default ProfilePage;
