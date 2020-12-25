import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import CheckInsView from "components/views/CheckInsView";

interface UserCheckInsPageProps {
  userId: string;
  filterUserIds?: string[];
  routes: {
    back: () => void;
    checkIn: (checkInId: string) => void;
  };
}

const UserCheckInsPage: React.FC<UserCheckInsPageProps> = ({
  userId,
  filterUserIds,
  routes,
}) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return (
          <CheckInsView
            nav={nav}
            routes={routes}
            userId={userId}
            filterUserIds={filterUserIds}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default UserCheckInsPage;
