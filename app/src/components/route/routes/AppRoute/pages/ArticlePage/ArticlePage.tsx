import React, { useCallback, useMemo } from "react";
import { useArticleStore } from "components/hooks/db/useArticles";
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

  const ids = useMemo(() => [articleId], [articleId]);

  const result = useArticleStore(ids);

  const nav = (
    <NavigationBar
      back={<BackButton onClick={goToProfile}>Profile</BackButton>}
    />
  );

  const article = result[0];

  if (!article) {
    return <LoadingView nav={nav} />;
  }

  if (!article) {
    return <ErrorView nav={nav}>Not found</ErrorView>;
  }

  return <ArticleDetailsView nav={nav} article={article} />;
};

export default ArticlePage;
