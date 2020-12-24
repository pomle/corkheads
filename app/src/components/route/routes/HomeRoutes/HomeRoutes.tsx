import React, { useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useExplicitLogout } from "components/hooks/useExplicitLogout";
import { useMe } from "components/hooks/useMe";
import BusyView from "components/views/BusyView";
import ToplistRoute from "components/route/routes/ToplistRoute";
import { Path } from "lib/path";
import ArticleRoutes from "../ArticleRoutes";
import { stringCodec } from "components/route/codecs";
import CollectionRoute from "components/route/routes/CollectionRoute";
import CheckInsRoute from "components/route/routes/CheckInsRoute";
import CheckInRoutes from "components/route/routes/CheckInRoutes";
import WishlistRoute from "components/route/routes/WishlistRoute";
import { paths as rootPaths } from "components/route/paths";
import SearchRoutes from "../SearchRoutes";

interface HomeRoutesProps {
  path: Path<{}>;
}

const HomeRoutes: React.FC<HomeRoutesProps> = ({ path }) => {
  const history = useHistory();

  const signOut = useExplicitLogout();

  const paths = useMemo(
    () => ({
      here: path,
      article: path.append("/article/:articleId", { articleId: stringCodec }),
      checkIn: path.append("/check-in/:checkInId", { checkInId: stringCodec }),
      checkIns: path.append("/check-ins", {}),
      collection: path.append("/collection", {}),
      search: rootPaths.search,
      settings: path.append("/settings", {}),
      toplist: path.append("/toplist", {}),
      wishlist: path.append("/wishlist", {}),
    }),
    [path]
  );

  const routes = useMemo(
    () => ({
      here() {
        const url = paths.here.url({});
        history.push(url);
      },
      article(articleId: string) {
        const url = paths.article.url({ articleId });
        history.push(url);
      },
      search() {
        const url = rootPaths.search.url({});
        history.push(url);
      },
    }),
    [paths, history]
  );

  const profilePageRoutes = useMemo(
    () => ({
      article: routes.article,
      collection() {
        return paths.collection.url({});
      },
      checkIn(checkInId: string) {
        const url = paths.checkIn.url({ checkInId });
        history.push(url);
      },
      checkIns() {
        return paths.checkIns.url({});
      },
      search: routes.search,
      settings: () => {
        const url = paths.settings.url({});
        history.push(url);
      },
      toplist() {
        return paths.toplist.url({});
      },
      wishlist() {
        return paths.wishlist.url({});
      },
    }),
    [history, paths, routes]
  );

  const settingsPageRoutes = useMemo(
    () => ({
      signOut,
      back: routes.here,
    }),
    [signOut, routes]
  );

  const element = useRef<React.ReactElement>();

  const user = useMe();

  if (user) {
    element.current = (
      <ViewStack>
        <ProfilePage userId={user.id} routes={profilePageRoutes} />
        <Screen path={paths.settings} transition={SlideRight}>
          {() => <SettingsPage userId={user.id} routes={settingsPageRoutes} />}
        </Screen>
        <Screen path={paths.toplist} transition={SlideRight}>
          {(match) => (
            <ToplistRoute origin={path} path={match.path} userId={user.id} />
          )}
        </Screen>
        <Screen path={paths.collection} transition={SlideRight}>
          {(match) => (
            <CollectionRoute origin={path} path={match.path} userId={user.id} />
          )}
        </Screen>
        <Screen path={paths.checkIns} transition={SlideRight}>
          {(match) => (
            <CheckInsRoute userId={user.id} origin={path} path={match.path} />
          )}
        </Screen>
        <Screen path={paths.wishlist} transition={SlideRight}>
          {(match) => (
            <WishlistRoute origin={path} path={match.path} userId={user.id} />
          )}
        </Screen>
        <Screen path={paths.article} transition={SlideRight}>
          {(match) => (
            <ArticleRoutes
              origin={path}
              path={match.path}
              userId={user.id}
              articleId={match.params.articleId}
            />
          )}
        </Screen>
        <Screen path={paths.checkIn} transition={SlideRight}>
          {(match) => (
            <CheckInRoutes
              origin={path}
              path={match.path}
              userId={user.id}
              checkInId={match.params.checkInId}
            />
          )}
        </Screen>
        <Screen path={paths.search} transition={SlideDown}>
          {(match) => (
            <SearchRoutes
              origin={paths.here}
              path={match.path}
              userId={user.id}
            />
          )}
        </Screen>
      </ViewStack>
    );
  }

  if (!element.current) {
    return <BusyView />;
  }

  return element.current;
};

export default HomeRoutes;
