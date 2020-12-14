import React, { useCallback } from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import CheckInCreateView from "components/views/CheckInCreateView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";
import { useMe } from "components/hooks/useMe";
import ErrorView from "components/views/ErrorView";
import ErrorBoundary from "components/views/ErrorBoundaryView";

interface CheckInCreatePageProps {
  articleId: string;
}

const CheckInCreatePage: React.FC<CheckInCreatePageProps> = ({ articleId }) => {
  const history = useHistory();

  const goToArticle = useCallback(() => {
    const url = paths.articleView.url({ articleId });
    history.push(url);
  }, [articleId, history]);

  const goToCheckIn = useCallback(
    (checkInId: string) => {
      const url = paths.checkInView.url({ checkInId });
      history.push(url);
    },
    [history]
  );

  const articleEntry = useArticle(articleId);

  const nav = (
    <NavigationBar back={<BackButton onClick={goToArticle}>Back</BackButton>} />
  );

  const user = useMe();

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (!articleEntry || !user) {
          return <LoadingView nav={nav} />;
        }

        const article = articleEntry.data;
        if (!article) {
          return <ErrorView nav={nav}>Not found</ErrorView>;
        }

        return (
          <CheckInCreateView
            key={history.location.key}
            nav={nav}
            article={article}
            user={user}
            onSuccess={goToCheckIn}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default CheckInCreatePage;
