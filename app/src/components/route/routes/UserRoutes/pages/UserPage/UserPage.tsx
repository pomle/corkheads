import React from "react";
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
    contributions: () => string;
    toplist: () => string;
    wishlist: () => string;
  };
}

const UserPage: React.FC<UserPageProps> = ({ routes, userId }) => {
  const nav = { back: <BackButton onClick={routes.back} /> };

  return (
    <ErrorBoundary nav={nav}>
      {() => <UserView nav={nav} routes={routes} userId={userId} />}
    </ErrorBoundary>
  );
};

export default UserPage;
