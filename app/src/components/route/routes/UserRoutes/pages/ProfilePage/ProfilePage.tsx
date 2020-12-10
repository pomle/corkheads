import React, { useMemo, useRef } from "react";
import { useUser } from "components/hooks/useUser";
import ProfileView from "components/views/ProfileView";
import ViewStack from "components/ui/layout/ViewStack";
import FindDrinkOverlayView from "components/views/FindDrinkOverlayView";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";
import NavigationBar from "components/ui/layout/NavigationBar";
import LoadingView from "components/views/LoadingView";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import NavButton from "components/ui/trigger/NavButton";
import { ReactComponent as SignOutIcon } from "assets/graphics/icons/signout.svg";
import * as paths from "../../paths";

const ProfilePage: React.FC = () => {
  const element = useRef<React.ReactElement>();

  const user = useUser();

  const signOut = useExplicitLogout();

  const nav = (
    <NavigationBar
      forward={
        <NavButton icon={<SignOutIcon />} onClick={signOut}>
          Sign out
        </NavButton>
      }
    />
  );

  const routes = useMemo(
    () => ({
      collection: paths.collectionView.url({}),
      checkIns: paths.checkInsView.url({}),
      toplist: paths.toplistView.url({}),
      wishlist: paths.wishlistView.url({}),
    }),
    []
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (user) {
          element.current = (
            <ViewStack>
              <ProfileView nav={nav} routes={routes} userId={user.uid} />
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
