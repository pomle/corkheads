import React from "react";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import { useMe } from "components/hooks/useMe";
import LoadingView from "components/views/LoadingView";

interface ArticlePageProps {
  articleId: string;
  routes: {
    back: () => void;
    checkIn: (checkInId: string) => void;
    createCheckIn: () => void;
    picture: () => void;
  };
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId, routes }) => {
  const user = useMe();

  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ErrorBoundary nav={nav}>
      {() => (
        <ArticleDetailsView
          key={articleId}
          nav={nav}
          routes={routes}
          userId={user.id}
          articleId={articleId}
        />
      )}
    </ErrorBoundary>
  );
};

export default ArticlePage;
