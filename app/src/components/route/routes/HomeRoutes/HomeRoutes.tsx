import React, { useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import ProfilePage from "./pages/ProfilePage";
import { useMe } from "components/hooks/useMe";
import BusyView from "components/views/BusyView";
import { Path } from "lib/path";
import ArticleRoutes from "../ArticleRoutes";
import { stringCodec } from "components/route/codecs";
import CheckInsRoute from "components/route/routes/CheckInsRoute";
import CheckInRoutes from "components/route/routes/CheckInRoutes";
import FriendsRoute from "components/route/routes/FriendsRoute";
import SearchRoutes from "components/route/routes/SearchRoutes";
import { paths as rootPaths } from "components/route/paths";
import { useScreen } from "components/context/ScreenContext";
import UserView from "components/views/UserView";

interface HomeRoutesProps {
  path: Path<{}>;
}

const HomeRoutes: React.FC<HomeRoutesProps> = ({ path }) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      here: path,
      article: path.append("/article/:articleId", { articleId: stringCodec }),
      checkIn: path.append("/check-in/:checkInId", { checkInId: stringCodec }),
      checkIns: path.append("/check-ins", {}),
      collection: path.append("/collection", {}),
      communityCheckIns: path.append("/community/check-ins", {}),
      contributions: path.append("/contributions", {}),
      friends: path.append("/friends", {}),
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
    }),
    [paths, history]
  );

  const profilePageRoutes = useMemo(
    () => ({
      article: routes.article,
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
      friends() {
        return paths.friends.url({});
      },
      user(userId: string) {
        const url = paths.user.url({ userId });
        history.push(url);
      },
    }),
    [history, paths, routes]
  );

  const element = useRef<React.ReactElement>();

  const user = useMe();

  useScreen({
    path: () => rootPaths.user,
    render: ({ userId }) => <UserView userId={userId} />,
    transition: SlideRight,
  });

  if (user) {
    element.current = (
      <ViewStack>
        <ProfilePage userId={user.id} routes={profilePageRoutes} />
        <Screen path={paths.communityCheckIns} transition={SlideRight}>
          {(match) => {
            return (
              <CheckInsRoute userId={user.id} origin={path} path={match.path} />
            );
          }}
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
