import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import NavButton from "components/ui/trigger/NavButton";
import { ReactComponent as SignOutIcon } from "assets/graphics/icons/signout.svg";
import UserSettingsView from "components/views/UserSettingsView";
import BackButton from "components/ui/trigger/BackButton";

interface SettingsPageProps {
  userId: string;
  routes: {
    signOut: () => void;
    back: () => void;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userId, routes }) => {
  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.back}>Profile</BackButton>}
      forward={
        <NavButton icon={<SignOutIcon />} onClick={routes.signOut}>
          Sign out
        </NavButton>
      }
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
