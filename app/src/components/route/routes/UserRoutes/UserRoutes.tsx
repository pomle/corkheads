import React from "react";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import * as paths from "components/route/paths";
import ProfilePage from "./pages/ProfilePage";
import CollectionPage from "./pages/CollectionPage";
import CheckInsPage from "./pages/CheckInsPage";
import ToplistPage from "./pages/ToplistPage";
import WishlistPage from "./pages/WishlistPage";

const UserRoutes: React.FC = () => {
  return (
    <ViewStack>
      <ProfilePage />
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
