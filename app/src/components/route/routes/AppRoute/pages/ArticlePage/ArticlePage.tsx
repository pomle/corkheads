import React, { useCallback } from "react";
import { useArticle } from "components/hooks/db/useArticles";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";

const ArticlePage: React.FC<{ articleId: string }> = ({ articleId }) => {
  const history = useHistory();

  const goToProfile = useCallback(() => {
    const url = paths.profileView.url({});
    history.push(url);
  }, [history]);

  const nav = (
    <NavigationBar
      back={<BackButton onClick={goToProfile}>Profile</BackButton>}
    />
  );

  const result = useArticle(articleId);

  if (result.busy) {
    return <LoadingView nav={nav} />;
  }

  if (!result.data) {
    return <ErrorView nav={nav}>Not found</ErrorView>;
  }

  return <ArticleDetailsView nav={nav} article={result.data} />;
};

export default ArticlePage;
