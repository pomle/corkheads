import React from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import CheckInCreateView from "components/views/CheckInCreateView";
import BackButton from "components/ui/trigger/BackButton";
import { useHistory } from "react-router-dom";
import { useMe } from "components/hooks/useMe";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import { useBack } from "components/context/ScreenContext";

interface CheckInCreatePageProps {
  articleId: string;
}

const CheckInCreatePage: React.FC<CheckInCreatePageProps> = ({ articleId }) => {
  const history = useHistory();

  const goBack = useBack();

  const articleEntry = useArticle(articleId);

  const nav = { back: <BackButton onClick={goBack} /> };

  const user = useMe();

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (!articleEntry || !user) {
          return <LoadingView nav={nav} />;
        }

        const article = articleEntry.data;
        if (!article) {
          return <LoadingView nav={nav} />;
        }

        return (
          <CheckInCreateView
            key={history.location.key}
            nav={nav}
            article={article}
            user={user}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default CheckInCreatePage;
