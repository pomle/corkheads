import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import UserToplistView from "components/views/UserToplistView";

interface ToplistPageProps {
  userId: string;
  routes: {
    back: () => void;
    article: (articleId: string) => void;
  };
}

const ToplistPage: React.FC<ToplistPageProps> = ({ userId, routes }) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserToplistView nav={nav} routes={routes} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default ToplistPage;
