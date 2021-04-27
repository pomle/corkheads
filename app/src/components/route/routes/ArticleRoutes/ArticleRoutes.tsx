import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import ArticlePage from "./pages/ArticlePage";
import ArticlePicturePage from "./pages/ArticlePicturePage";
import CheckInCreatePage from "./pages/CheckInCreatePage";
import { Path } from "lib/path";
import { paths as rootPaths } from "components/route/paths";
import { ScreenContext } from "components/context/ScreenContext";

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
      createCheckIn: () => {
        const url = paths.createCheckIn.url({});
        history.push(url);
      },
      checkIn: routes.checkIn,
    }),
    [routes, paths, history]
  );

  const createCheckInPageRoutes = useMemo(
    () => ({
      back: routes.here,
      checkIn: routes.checkIn,
    }),
    [routes]
  );

  return (
    <ScreenContext mountPath={path}>
      <ViewStack>
        <ArticlePage routes={articlePageRoutes} articleId={articleId} />
        <Screen path={paths.createCheckIn} transition={SlideRight}>
          {() => (
            <CheckInCreatePage
              routes={createCheckInPageRoutes}
              articleId={articleId}
            />
          )}
        </Screen>
      </ViewStack>
    </ScreenContext>
  );
};

export default ArticleRoutes;
