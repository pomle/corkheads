import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import ArticlePicturePage from "components/route/pages/ArticlePicturePage";
import * as paths from "components/route/paths";
import ArticlePage from "./pages/ArticlePage";
import CheckInCreatePage from "./pages/CheckInCreatePage";
import * as rootPaths from "../../paths";

interface ArticleRoutesProps {
  articleId: string;
}

const ArticleRoutes: React.FC<ArticleRoutesProps> = ({ articleId }) => {
  const history = useHistory();

  const routes = useMemo(
    () => ({
      back: () => {
        const url = rootPaths.articleView.url({ articleId });
        history.push(url);
      },
    }),
    [articleId, history]
  );

  return (
    <ViewStack>
      <ArticlePage articleId={articleId} />
      <Screen path={paths.articlePicture} transition={ZoomCenter}>
        {(params) => (
          <ArticlePicturePage routes={routes} articleId={params.articleId} />
        )}
      </Screen>
      <Screen path={paths.articleCheckIn} transition={SlideRight}>
        {(params) => <CheckInCreatePage articleId={params.articleId} />}
      </Screen>
    </ViewStack>
  );
};

export default ArticleRoutes;
