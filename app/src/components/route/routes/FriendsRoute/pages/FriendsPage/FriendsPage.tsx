import React from "react";
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
  const nav = { back: <BackButton onClick={routes.back} /> };

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserFriendsView nav={nav} routes={routes} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default FriendsPage;
