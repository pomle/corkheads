import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import UserFriendsView from "components/views/UserFriendsView";

interface FriendsPageProps {
  userId: string;
  routes: {
    back: () => void;
    user: (userId: string) => void;
  };
}

const FriendsPage: React.FC<FriendsPageProps> = ({ userId, routes }) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserFriendsView nav={nav} routes={routes} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default FriendsPage;
