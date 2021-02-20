import React from "react";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import UserSettingsView from "components/views/UserSettingsView";
import BackButton from "components/ui/trigger/BackButton";

interface SettingsPageProps {
  userId: string;
  routes: {
    back: () => void;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userId, routes }) => {
  const nav = { back: <BackButton onClick={routes.back} /> };

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserSettingsView nav={nav} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default SettingsPage;
