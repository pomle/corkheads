import React from "react";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import NotificationsView from "components/views/NotificationsView";
import BackButton from "components/ui/trigger/BackButton";

interface NotificationsPageProps {
  userId: string;
  routes: {
    back: () => void;
    checkIn: (checkInId: string) => void;
  };
}

const NotificationsPage: React.FC<NotificationsPageProps> = ({
  userId,
  routes,
}) => {
  const nav = { back: <BackButton onClick={routes.back} /> };

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <NotificationsView nav={nav} routes={routes} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default NotificationsPage;
