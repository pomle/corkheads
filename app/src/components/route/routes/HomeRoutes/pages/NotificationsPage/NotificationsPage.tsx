import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
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
  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.back}>Profile</BackButton>}
    />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <NotificationsView nav={nav} routes={routes} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default NotificationsPage;
