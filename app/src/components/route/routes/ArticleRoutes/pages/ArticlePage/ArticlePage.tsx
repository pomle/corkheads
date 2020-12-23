import React from "react";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import ErrorBoundary from "components/views/ErrorBoundaryView";

interface ArticlePageProps {
  articleId: string;
  userId: string;
  routes: {
    back: () => void;
    checkIn: (checkInId: string) => void;
    createCheckIn: () => void;
    picture: () => void;
  };
}

const ArticlePage: React.FC<ArticlePageProps> = ({
  userId,
  articleId,
  routes,
}) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => (
        <ArticleDetailsView
          key={articleId}
          nav={nav}
          routes={routes}
          userId={userId}
          articleId={articleId}
        />
      )}
    </ErrorBoundary>
  );
};

export default ArticlePage;
