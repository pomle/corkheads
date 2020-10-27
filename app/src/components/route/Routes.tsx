import React, { useCallback } from "react";
import AppRoute from "./routes/AppRoute";
import Screen from "./Screen";
import ExploreArticlesView from "components/views/ExploreArticlesView";
import * as paths from "./paths";
import { useNav } from "components/hooks/useNav";
import { Article } from "types/types";

const Routes: React.FC = () => {
  const goToArticle = useNav(paths.articleView);
  const handleSelect = useCallback((article: Article) => {
    goToArticle({articleId: article.id});
  }, [goToArticle]);

  return (
    <AppRoute>
      <Screen path={paths.exploreArticles}>
        {() => <ExploreArticlesView onSelect={handleSelect}/>}
      </Screen>
    </AppRoute>
  );
};

export default Routes;
