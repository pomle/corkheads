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
import ErrorBoundary from "components/views/ErrorBoundaryView";

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

  const articleEntry = useArticle(articleId);
  const userArticleEntry = useUserArticle(userId, articleId);

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (!articleEntry || !userArticleEntry) {
          return <LoadingView nav={nav} />;
        }

        if (!articleEntry.data) {
          return <ErrorView nav={nav}>Not found</ErrorView>;
        }

        return (
          <ArticleDetailsView
            nav={nav}
            articleEntry={articleEntry}
            userArticleEntry={userArticleEntry}
          />
        );
      }}
    </ErrorBoundary>
  );
};

const ArticleRoute: React.FC<{ articleId: string }> = ({ articleId }) => {
  return (
    <WithUser>
      {({ user }) => (
        <ArticlePage key={articleId} userId={user.uid} articleId={articleId} />
      )}
    </WithUser>
  );
};

export default ArticleRoute;
