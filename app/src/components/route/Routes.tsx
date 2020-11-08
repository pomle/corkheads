import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import Screen from "./Screen";
import ExploreArticlesView from "components/views/ExploreArticlesView";
import * as paths from "components/route/paths";
import { Article } from "types/types";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import ViewStack from "components/ui/layout/ViewStack";
import ProfileView from "components/views/ProfileView";
import ArticlePage from "./routes/AppRoute/pages/ArticlePage";
import CheckInPage from "./routes/AppRoute/pages/CheckInPage";

const Routes: React.FC = () => {
  const history = useHistory();
  const handleSelect = useCallback(
    (article: Article) => {
      const url = paths.articleView.url({ articleId: article.id });
      history.push(url);
    },
    [history]
  );

  return (
    <AppRoute>
      <ViewStack>
        <ProfileView />
        <Screen path={paths.articleView} transition={SlideRight}>
          {(params) => <ArticlePage articleId={params.articleId} />}
        </Screen>
        <Screen path={paths.articleCheckIn} transition={SlideRight}>
          {(params) => <CheckInPage articleId={params.articleId} />}
        </Screen>
        <Screen path={paths.exploreArticles} transition={SlideDown}>
          {() => <ExploreArticlesView onSelect={handleSelect} />}
        </Screen>
      </ViewStack>
    </AppRoute>
  );
};

export default Routes;
