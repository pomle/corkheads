import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import CheckInPage from "./pages/CheckInPage";
import CheckInPicturePage from "./pages/CheckInPicturePage";
import { Path } from "lib/path";
import { stringCodec } from "components/route/codecs";
import { SlideRight } from "components/ui/transitions/Slide";
import ArticleRoutes from "components/route/routes/ArticleRoutes";
import { paths as rootPaths } from "components/route/paths";

interface CheckInRoutesProps {
  origin: Path<{}>;
  path: Path<{}>;
  userId: string;
  checkInId: string;
}

const CheckInRoutes: React.FC<CheckInRoutesProps> = ({
  userId,
  checkInId,
  origin,
  path,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      article: path.append("/article/:articleId", { articleId: stringCodec }),
      picture: path.append("/picture", {}),
      user: rootPaths.user,
    }),
    [path]
  );

  const routes = useMemo(
    () => ({
      prev() {
        const url = origin.url({});
        history.push(url);
      },
      here() {
        const url = path.url({});
        history.push(url);
      },
    }),
    [path, origin, history]
  );

  const checkInPageRoutes = useMemo(
    () => ({
      back: routes.prev,
      picture() {
        const url = paths.picture.url({});
        history.push(url);
      },
      article(articleId: string) {
        const url = paths.article.url({ articleId });
        history.push(url);
      },
      user(userId: string) {
        const url = paths.user.url({ userId });
        history.push(url);
      },
    }),
    [routes, paths, history]
  );

  const picturePageRoutes = useMemo(
    () => ({
      back: routes.here,
    }),
    [routes]
  );

  return (
    <ViewStack>
      <CheckInPage routes={checkInPageRoutes} checkInId={checkInId} />
      <Screen path={paths.picture} transition={ZoomCenter}>
        {() => (
          <CheckInPicturePage
            routes={picturePageRoutes}
            checkInId={checkInId}
          />
        )}
      </Screen>
      <Screen path={paths.article} transition={SlideRight}>
        {(match) => {
          return (
            <ArticleRoutes
              origin={path}
              path={match.path}
              articleId={match.params.articleId}
            />
          );
        }}
      </Screen>
    </ViewStack>
  );
};

export default CheckInRoutes;
