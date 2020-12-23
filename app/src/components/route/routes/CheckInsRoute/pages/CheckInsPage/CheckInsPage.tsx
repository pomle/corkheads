import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import UserCheckInsView from "components/views/UserCheckInsView";

interface CheckInsPageProps {
  userId: string;
  routes: {
    back: () => void;
    checkIn: (checkInId: string) => void;
  };
}

const CheckInsPage: React.FC<CheckInsPageProps> = ({ userId, routes }) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserCheckInsView nav={nav} routes={routes} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default CheckInsPage;
