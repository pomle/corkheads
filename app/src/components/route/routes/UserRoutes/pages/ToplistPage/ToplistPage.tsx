import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useMe } from "components/hooks/useMe";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import LoadingView from "components/views/LoadingView";
import UserToplistView from "components/views/UserToplistView";
import * as paths from "components/route/paths";

const ToplistPage: React.FC = () => {
  const history = useHistory();
  const user = useMe();

  const goHome = useCallback(() => {
    const url = paths.profileView.url({});
    history.push(url);
  }, [history]);

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const nav = (
    <NavigationBar back={<BackButton onClick={goHome}>Profile</BackButton>} />
  );

  const routes = useMemo(
    () => ({
      article: goToArticle,
    }),
    [goToArticle]
  );

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserToplistView nav={nav} routes={routes} userId={user.id} />;
      }}
    </ErrorBoundary>
  );
};

export default ToplistPage;
