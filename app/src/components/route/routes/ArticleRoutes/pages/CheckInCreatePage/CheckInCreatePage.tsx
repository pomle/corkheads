import React from "react";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import CheckInCreateView from "components/views/CheckInCreateView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import { useHistory } from "react-router-dom";
import { useMe } from "components/hooks/useMe";
import ErrorBoundary from "components/views/ErrorBoundaryView";

interface CheckInCreatePageProps {
  articleId: string;
  routes: {
    back: () => void;
    checkIn: (checkInId: string) => void;
  };
}

const CheckInCreatePage: React.FC<CheckInCreatePageProps> = ({
  articleId,
  routes,
}) => {
  const history = useHistory();

  const articleEntry = useArticle(articleId);

  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
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
          return <LoadingView nav={nav} />;
        }

        return (
          <CheckInCreateView
            key={history.location.key}
            nav={nav}
            article={article}
            user={user}
            routes={routes}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default CheckInCreatePage;
