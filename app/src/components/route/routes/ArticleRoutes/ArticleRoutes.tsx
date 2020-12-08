import React from "react";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import { ZoomCenter } from "components/ui/transitions/Zoom";
import * as paths from "components/route/paths";
import ArticlePage from "./pages/ArticlePage";
import CheckInCreatePage from "./pages/CheckInCreatePage";
import ArticlePicturePage from "./pages/ArticlePicturePage";

interface ArticleRoutesProps {
  articleId: string;
}

const ArticleRoutes: React.FC<ArticleRoutesProps> = ({ articleId }) => {
  return (
    <ViewStack>
      <ArticlePage articleId={articleId} />
      <Screen path={paths.articlePicture} transition={ZoomCenter}>
        {(params) => <ArticlePicturePage articleId={params.articleId} />}
      </Screen>
      <Screen path={paths.articleCheckIn} transition={SlideRight}>
        {(params) => <CheckInCreatePage articleId={params.articleId} />}
      </Screen>
    </ViewStack>
  );
};

export default ArticleRoutes;
