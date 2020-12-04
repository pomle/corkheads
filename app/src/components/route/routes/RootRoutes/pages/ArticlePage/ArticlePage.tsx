import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useUser } from "components/hooks/useUser";
import { User } from "types/User";
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

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return (
          <ArticleDetailsView nav={nav} userId={userId} articleId={articleId} />
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
