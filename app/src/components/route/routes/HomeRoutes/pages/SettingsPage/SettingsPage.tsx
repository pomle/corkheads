import React from "react";
import { useMe } from "components/hooks/useMe";
import NavigationBar from "components/ui/layout/NavigationBar";
import LoadingView from "components/views/LoadingView";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import NavButton from "components/ui/trigger/NavButton";
import { ReactComponent as SignOutIcon } from "assets/graphics/icons/signout.svg";
import UserSettingsView from "components/views/UserSettingsView";
import BackButton from "components/ui/trigger/BackButton";

interface SettingsPageProps {
  routes: {
    signOut: () => void;
    back: () => void;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = ({ routes }) => {
  const user = useMe();

  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.back}>Done</BackButton>}
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
        if (!user) {
          return <LoadingView nav={nav} />;
        }

        return <UserSettingsView nav={nav} userId={user.id} />;
      }}
    </ErrorBoundary>
  );
};

export default SettingsPage;
