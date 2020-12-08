import React from "react";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import * as paths from "components/route/paths";
import ArticlePage from "./pages/ArticlePage";
import CheckInCreatePage from "./pages/CheckInCreatePage";

interface ArticleRoutesProps {
  articleId: string;
}

const ArticleRoutes: React.FC<ArticleRoutesProps> = ({ articleId }) => {
  return (
    <ViewStack>
      <ArticlePage articleId={articleId} />
      <Screen path={paths.articleCheckIn} transition={SlideRight}>
        {(params) => <CheckInCreatePage articleId={params.articleId} />}
      </Screen>
    </ViewStack>
  );
};

export default ArticleRoutes;
