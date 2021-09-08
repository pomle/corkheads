import React, { useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import { ViewStack } from "@pomle/react-viewstack";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useMe } from "components/hooks/useMe";
import BusyView from "components/views/BusyView";
import ToplistRoute from "components/route/routes/ToplistRoute";
import { Path, codecs } from "@pomle/paths";
import ArticleRoutes from "../ArticleRoutes";
import CollectionRoute from "components/route/routes/CollectionRoute";
import CheckInsRoute from "components/route/routes/CheckInsRoute";
import CheckInRoutes from "components/route/routes/CheckInRoutes";
import FriendsRoute from "components/route/routes/FriendsRoute";
import WishlistRoute from "components/route/routes/WishlistRoute";
import SearchRoutes from "components/route/routes/SearchRoutes";
import UserRoutes from "components/route/routes/UserRoutes/UserRoutes";
import { paths as rootPaths } from "components/route/paths";
import ContributionsRoute from "../ContributionsRoute";
import NotificationsPage from "./pages/NotificationsPage";

interface HomeRoutesProps {
  path: Path<{}>;
}

const HomeRoutes: React.FC<HomeRoutesProps> = ({ path }) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      here: path,
      article: path.append("/article/:articleId", { articleId: codecs.string }),
      checkIn: path.append("/check-in/:checkInId", {
        checkInId: codecs.string,
      }),
      checkIns: path.append("/check-ins", {}),
      collection: path.append("/collection", {}),
      communityCheckIns: path.append("/community/check-ins", {}),
      contributions: path.append("/contributions", {}),
      friends: path.append("/friends", {}),
      search: rootPaths.search,
      notifications: path.append("/notifications", {}),
      settings: path.append("/settings", {}),
      toplist: path.append("/toplist", {}),
      user: rootPaths.user,
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
      communityCheckIns() {
        return paths.communityCheckIns.url({});
      },
      contributions() {
        return paths.contributions.url({});
      },
      friends() {
        return paths.friends.url({});
      },
      notifications: () => {
        const url = paths.notifications.url({});
        history.push(url);
      },
      search: routes.search,
      settings: () => {
        const url = paths.settings.url({});
        history.push(url);
      },
      toplist() {
        return paths.toplist.url({});
      },
      user(userId: string) {
        const url = paths.user.url({ userId });
        history.push(url);
      },
      wishlist() {
        return paths.wishlist.url({});
      },
    }),
    [history, paths, routes]
  );

  const settingsPageRoutes = useMemo(
    () => ({
      back: routes.here,
    }),
    [routes]
  );

  const notificationsPageRoutes = useMemo(
    () => ({
      checkIn(checkInId: string) {
        const url = paths.checkIn.url({ checkInId });
        history.push(url);
      },
      back: routes.here,
    }),
    [paths.checkIn, routes, history]
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
        <Screen path={paths.notifications} transition={SlideRight}>
          {() => (
            <NotificationsPage
              userId={user.id}
              routes={notificationsPageRoutes}
            />
          )}
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
          {(match) => {
            return (
              <CheckInsRoute
                userId={user.id}
                filterUserIds={[user.id]}
                origin={path}
                path={match.path}
              />
            );
          }}
        </Screen>
        <Screen path={paths.communityCheckIns} transition={SlideRight}>
          {(match) => {
            return (
              <CheckInsRoute userId={user.id} origin={path} path={match.path} />
            );
          }}
        </Screen>
        <Screen path={paths.contributions} transition={SlideRight}>
          {(match) => (
            <ContributionsRoute
              origin={path}
              path={match.path}
              userId={user.id}
            />
          )}
        </Screen>
        <Screen path={paths.friends} transition={SlideRight}>
          {(match) => (
            <FriendsRoute
              origin={paths.here}
              path={match.path}
              userId={user.id}
            />
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
        <Screen path={paths.user} transition={SlideRight}>
          {(match) => (
            <UserRoutes
              origin={paths.here}
              path={match.path}
              userId={match.params.userId}
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
