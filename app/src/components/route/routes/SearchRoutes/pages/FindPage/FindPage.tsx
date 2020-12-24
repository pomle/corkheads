import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ExploreArticlesView from "components/views/ExploreArticlesView";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import CancelButton from "components/ui/trigger/CancelButton/CancelButton";
import { useMe } from "components/hooks/useMe";
import LoadingView from "components/views/LoadingView";

interface FindPageProps {
  routes: {
    article: (articleId: string) => void;
    cancel: () => void;
    createArticle: () => string;
  };
}

const FindPage: React.FC<FindPageProps> = ({ routes }) => {
  const user = useMe();

  const nav = (
    <NavigationBar
      back={<CancelButton onClick={routes.cancel}>Close</CancelButton>}
    />
  );

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ErrorBoundary nav={nav}>
      {() => <ExploreArticlesView nav={nav} userId={user.id} routes={routes} />}
    </ErrorBoundary>
  );
};

export default FindPage;
