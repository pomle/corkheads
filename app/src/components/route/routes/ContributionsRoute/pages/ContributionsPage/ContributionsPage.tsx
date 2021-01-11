import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import UserContributionsView from "components/views/UserContributionsView";

interface ContributionsPageProps {
  userId: string;
  routes: {
    back: () => void;
    article: (articleId: string) => void;
  };
}

const ContributionsPage: React.FC<ContributionsPageProps> = ({
  userId,
  routes,
}) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return (
          <UserContributionsView nav={nav} routes={routes} userId={userId} />
        );
      }}
    </ErrorBoundary>
  );
};

export default ContributionsPage;
