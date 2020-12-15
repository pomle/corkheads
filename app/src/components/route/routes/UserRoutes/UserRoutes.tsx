import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import * as paths from "components/route/paths";
import ProfilePage from "./pages/ProfilePage";
import CollectionPage from "./pages/CollectionPage";
import CheckInsPage from "./pages/CheckInsPage";
import ToplistPage from "./pages/ToplistPage";
import WishlistPage from "./pages/WishlistPage";
import SettingsPage from "./pages/SettingsPage";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";

const UserRoutes: React.FC = () => {
  const history = useHistory();

  const signOut = useExplicitLogout();

  const routes = useMemo(
    () => ({
      signOut,
      back: () => {
        const url = paths.profileView.url({});
        history.push(url);
      },
      settings: () => {
        const url = paths.settingsView.url({});
        history.push(url);
      },
      collection: () => {
        return paths.collectionView.url({});
      },
      checkIns: () => {
        return paths.checkInsView.url({});
      },
      toplist: () => {
        return paths.toplistView.url({});
      },
      wishlist: () => {
        return paths.wishlistView.url({});
      },
    }),
    [history, signOut]
  );

  return (
    <ViewStack>
      <ProfilePage routes={routes} />
      <Screen path={paths.settingsView} transition={SlideRight}>
        {() => <SettingsPage routes={routes} />}
      </Screen>
      <Screen path={paths.toplistView} transition={SlideRight}>
        {() => <ToplistPage />}
      </Screen>
      <Screen path={paths.collectionView} transition={SlideRight}>
        {() => <CollectionPage />}
      </Screen>
      <Screen path={paths.checkInsView} transition={SlideRight}>
        {() => <CheckInsPage />}
      </Screen>
      <Screen path={paths.wishlistView} transition={SlideRight}>
        {() => <WishlistPage />}
      </Screen>
    </ViewStack>
  );
};

export default UserRoutes;
