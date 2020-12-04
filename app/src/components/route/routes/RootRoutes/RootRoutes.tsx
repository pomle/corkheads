import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideDown, SlideRight } from "components/ui/transitions/Slide";
import { Article } from "types/Article";
import * as paths from "components/route/paths";
import ArticlePage from "./pages/ArticlePage";
import CheckInPage from "./pages/CheckInPage";
import CheckInCreatePage from "./pages/CheckInCreatePage";
import FindPage from "./pages/FindPage";
import ProfilePage from "./pages/ProfilePage";
import ArticleCreatePage from "./pages/ArticleCreatePage";
import CollectionPage from "./pages/CollectionPage";
import CheckInsPage from "./pages/CheckInsPage";

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
      <ProfilePage />
      <Screen path={paths.collectionView} transition={SlideRight}>
        {() => <CollectionPage />}
      </Screen>
      <Screen path={paths.checkInsView} transition={SlideRight}>
        {() => <CheckInsPage />}
      </Screen>
      <Screen path={paths.articleView} transition={SlideRight}>
        {(params) => <ArticlePage articleId={params.articleId} />}
      </Screen>
      <Screen path={paths.checkInView} transition={SlideRight}>
        {(params) => <CheckInPage checkInId={params.checkInId} />}
      </Screen>
      <Screen path={paths.articleCheckIn} transition={SlideRight}>
        {(params) => <CheckInCreatePage articleId={params.articleId} />}
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
