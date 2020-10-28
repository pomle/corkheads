import React, { useCallback, useMemo } from "react";
import AppRoute from "./routes/AppRoute";
import Screen from "./Screen";
import ExploreArticlesView from "components/views/ExploreArticlesView";
import * as paths from "./paths";
import { useNav } from "components/hooks/useNav";
import { Article } from "types/types";
import { useArticles } from "components/hooks/db/useArticles";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import { SlideRight } from "components/ui/transitions/Slide";
import ViewStack from "components/ui/layout/ViewStack";

const ArticleViewPath: React.FC<{articleId: string}> = ({articleId}) => {
  const searchQuery = useMemo(() => ({
    fetch: {
      ids: [articleId],
    }
  }), [articleId]);

  const result = useArticles(searchQuery);

  const Nav = <>T</>;

  if (result.busy) {
    return <LoadingView nav={Nav} />
  }

  if (!result?.data?.length) {
    return <ErrorView nav={Nav}>
      Not found
    </ErrorView>;
  }

  return <ArticleDetailsView nav={Nav} article={result.data[0]}/>
}

const Routes: React.FC = () => {
  const goToArticle = useNav(paths.articleView);
  const handleSelect = useCallback((article: Article) => {
    goToArticle({articleId: article.id});
  }, [goToArticle]);

  return (
    <AppRoute>
      <ViewStack>
        <Screen path={paths.exploreArticles}>
          {() => <ExploreArticlesView onSelect={handleSelect}/>}
        </Screen>
        <Screen path={paths.articleView} transition={SlideRight}>
          {params => <ArticleViewPath articleId={params.articleId}/>}
        </Screen>
      </ViewStack>
    </AppRoute>
  );
};

export default Routes;
