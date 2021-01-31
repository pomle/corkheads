import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
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
  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.back}>Profile</BackButton>}
    />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserSettingsView nav={nav} userId={userId} />;
      }}
    </ErrorBoundary>
  );
};

export default SettingsPage;
