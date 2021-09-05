import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import ToplistRoute from "components/route/routes/ToplistRoute";
import { Path, codecs } from "@pomle/paths";
import ArticleRoutes from "components/route/routes/ArticleRoutes";
import CollectionRoute from "components/route/routes/CollectionRoute";
import CheckInsRoute from "components/route/routes/CheckInsRoute";
import CheckInRoutes from "components/route/routes/CheckInRoutes";
import WishlistRoute from "components/route/routes/WishlistRoute";
import UserPage from "./pages/UserPage";
import ContributionsRoute from "../ContributionsRoute";

interface UserRoutesProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
}

const UserRoutes: React.FC<UserRoutesProps> = ({ userId, origin, path }) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      prev: origin,
      here: path,
      article: path.append("/article/:articleId", {
        articleId: codecs.string,
      }),
      checkIn: path.append("/check-in/:checkInId", {
        checkInId: codecs.string,
      }),
      checkIns: path.append("/check-ins", {}),
      collection: path.append("/collection", {}),
      contributions: path.append("/contributions", {}),
      toplist: path.append("/toplist", {}),
      wishlist: path.append("/wishlist", {}),
    }),
    [origin, path]
  );

  const routes = useMemo(
    () => ({
      back() {
        const url = paths.prev.url({});
        history.push(url);
      },
      article(articleId: string) {
        const url = paths.article.url({ articleId });
        history.push(url);
      },
      checkIn(checkInId: string) {
        const url = paths.checkIn.url({ checkInId });
        history.push(url);
      },
      collection() {
        return paths.collection.url({});
      },
      contributions() {
        return paths.contributions.url({});
      },
      checkIns() {
        return paths.checkIns.url({});
      },
      toplist() {
        return paths.toplist.url({});
      },
      wishlist() {
        return paths.wishlist.url({});
      },
    }),
    [paths, history]
  );

  return (
    <ViewStack>
      <UserPage userId={userId} routes={routes} />
      <Screen path={paths.toplist} transition={SlideRight}>
        {(match) => (
          <ToplistRoute origin={path} path={match.path} userId={userId} />
        )}
      </Screen>
      <Screen path={paths.collection} transition={SlideRight}>
        {(match) => (
          <CollectionRoute origin={path} path={match.path} userId={userId} />
        )}
      </Screen>
      <Screen path={paths.checkIns} transition={SlideRight}>
        {(match) => {
          return (
            <CheckInsRoute
              userId={userId}
              filterUserIds={[userId]}
              origin={path}
              path={match.path}
            />
          );
        }}
      </Screen>
      <Screen path={paths.contributions} transition={SlideRight}>
        {(match) => (
          <ContributionsRoute origin={path} path={match.path} userId={userId} />
        )}
      </Screen>
      <Screen path={paths.wishlist} transition={SlideRight}>
        {(match) => (
          <WishlistRoute origin={path} path={match.path} userId={userId} />
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
            userId={userId}
            checkInId={match.params.checkInId}
          />
        )}
      </Screen>
    </ViewStack>
  );
};

export default UserRoutes;
