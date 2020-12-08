import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import { Article } from "types/Article";
import * as paths from "components/route/paths";
import ArticleRoutes from "components/route/routes/ArticleRoutes";
import CheckInRoutes from "components/route/routes/CheckInRoutes";
import UserRoutes from "components/route/routes/UserRoutes";
import FindPage from "./pages/FindPage";
import ArticleCreatePage from "./pages/ArticleCreatePage";

const RootRoutes: React.FC = () => {
  const history = useHistory();
  const handleSelect = useCallback(
    (article: Article) => {
      const url = paths.articleView.url({ articleId: article.id });
      history.replace(url);
    },
    [history]
  );

  return (
    <ViewStack>
      <UserRoutes />
      <Screen path={paths.articleView} transition={SlideRight}>
        {(params) => <ArticleRoutes articleId={params.articleId} />}
      </Screen>
      <Screen path={paths.checkInView} transition={SlideRight}>
        {(params) => <CheckInRoutes checkInId={params.checkInId} />}
      </Screen>
      <Screen path={paths.articleCreate} transition={SlideDown}>
        {() => <ArticleCreatePage />}
      </Screen>
      <Screen path={paths.exploreArticles} transition={SlideDown}>
        {() => <FindPage onSelect={handleSelect} />}
      </Screen>
    </ViewStack>
  );
};

export default RootRoutes;
