import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useArticle } from "components/hooks/db/useArticles";
import { useUser } from "components/hooks/useUser";
import { User } from "types/User";
import { useUserArticle } from "components/hooks/db/useUserArticles";

const WithUser: React.FC<{ children: React.FC<{ user: User }> }> = ({
  children: render,
}) => {
  const user = useUser();
  if (!user) {
    return null;
  }

  return render({ user });
};

const ArticlePage: React.FC<{ userId: string; articleId: string }> = ({
  userId,
  articleId,
}) => {
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

  const articleResult = useArticle(articleId);
  const userArticleResult = useUserArticle(userId, articleId);

  if (userArticleResult.busy || articleResult.busy) {
    return <LoadingView nav={nav} />;
  }

  const articleEntry = articleResult.data;
  const userArticleEntry = userArticleResult.data;

  if (!articleEntry || !userArticleEntry) {
    return <ErrorView nav={nav}>Not found</ErrorView>;
  }

  return (
    <ArticleDetailsView
      nav={nav}
      articleEntry={articleEntry}
      userArticleEntry={userArticleEntry}
    />
  );
};

const ArticleRoute: React.FC<{ articleId: string }> = ({ articleId }) => {
  return (
    <WithUser>
      {({ user }) => <ArticlePage userId={user.uid} articleId={articleId} />}
    </WithUser>
  );
};

export default ArticleRoute;
