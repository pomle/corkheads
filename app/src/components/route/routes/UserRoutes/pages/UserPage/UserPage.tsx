import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import UserView from "components/views/UserView";

interface UserPageProps {
  userId: string;
  routes: {
    back: () => void;
    article: (articleId: string) => void;
    checkIn: (checkInId: string) => void;
    checkIns: () => string;
    collection: () => string;
    toplist: () => string;
    wishlist: () => string;
  };
}

const UserPage: React.FC<UserPageProps> = ({ routes, userId }) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => <UserView nav={nav} routes={routes} userId={userId} />}
    </ErrorBoundary>
  );
};

export default UserPage;
