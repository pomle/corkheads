import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import ArticlePicturePage from "components/route/pages/ArticlePicturePage";
import ArticlePage from "./pages/ArticlePage";
import CheckInCreatePage from "./pages/CheckInCreatePage";
import { Path } from "lib/path";
import { paths as rootPaths } from "components/route/paths";

interface ArticleRoutesProps {
  origin: Path<{}>;
  path: Path<{}>;
  articleId: string;
}

const ArticleRoutes: React.FC<ArticleRoutesProps> = ({
  articleId,
  path,
  origin,
}) => {
  const history = useHistory();

  const paths = useMemo(
    () => ({
      here: path,
      picture: path.append("/picture", {}),
      createCheckIn: path.append("/check-in/", {}),
      checkIn: rootPaths.checkIn,
    }),
    [path]
  );

  const routes = useMemo(
    () => ({
      prev: () => {
        const url = origin.url({});
        history.push(url);
      },
      here: () => {
        const url = path.url({});
        history.push(url);
      },
      checkIn: (checkInId: string) => {
        const url = paths.checkIn.url({ checkInId });
        history.push(url);
      },
    }),
    [origin, path, paths, history]
  );

  const articlePageRoutes = useMemo(
    () => ({
      back: routes.prev,
      picture: () => {
        const url = paths.picture.url({});
        history.push(url);
      },
      createCheckIn: () => {
        const url = paths.createCheckIn.url({});
        history.push(url);
      },
      checkIn: routes.checkIn,
    }),
    [routes, paths, history]
  );

  const picturePageRoutes = useMemo(
    () => ({
      back: routes.here,
    }),
    [routes]
  );

  const createCheckInPageRoutes = useMemo(
    () => ({
      back: routes.here,
      checkIn: routes.checkIn,
    }),
    [routes]
  );

  return (
    <ViewStack>
      <ArticlePage routes={articlePageRoutes} articleId={articleId} />
      <Screen path={paths.picture} transition={ZoomCenter}>
        {() => (
          <ArticlePicturePage
            routes={picturePageRoutes}
            articleId={articleId}
          />
        )}
      </Screen>
      <Screen path={paths.createCheckIn} transition={SlideRight}>
        {() => (
          <CheckInCreatePage
            routes={createCheckInPageRoutes}
            articleId={articleId}
          />
        )}
      </Screen>
    </ViewStack>
  );
};

export default ArticleRoutes;
