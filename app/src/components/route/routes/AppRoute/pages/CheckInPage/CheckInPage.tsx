import React, { useCallback } from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import CheckInView from "components/views/CheckInView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";
import { useUser } from "components/hooks/useUser";
import ErrorView from "components/views/ErrorView";

const CheckInPage: React.FC<{ articleId: string }> = ({ articleId }) => {
  const history = useHistory();

  const goToArticle = useCallback(() => {
    const url = paths.articleView.url({ articleId });
    history.push(url);
  }, [articleId, history]);

  const goToProfile = useCallback(() => {
    const url = paths.profileView.url({});
    history.push(url);
  }, [history]);

  const result = useArticle(articleId);
  const article = result.data;

  const nav = (
    <NavigationBar
      back={
        <BackButton onClick={goToArticle}>
          {article ? article.data.displayName : "Article"}
        </BackButton>
      }
    />
  );

  const user = useUser();

  if (result.busy || !user) {
    return <LoadingView nav={nav} />;
  }

  if (!article) {
    return <ErrorView nav={nav}>Not found</ErrorView>;
  }

  return (
    <CheckInView
      key={history.location.key}
      nav={nav}
      article={article}
      user={user}
      onSuccess={goToProfile}
    />
  );
};

export default CheckInPage;
