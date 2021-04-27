import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import ArticlePage from "./pages/ArticlePage";
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
      checkIn: routes.checkIn,
    }),
    [routes, paths, history]
  );

  return (
    <ScreenContext originPath={origin} mountPath={path}>
      <ArticlePage routes={articlePageRoutes} articleId={articleId} />
    </ScreenContext>
  );
};

export default ArticleRoutes;
