import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "components/hooks/useUser";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import LoadingView from "components/views/LoadingView";
import UserCheckInsView from "components/views/UserCheckInsView";
import * as paths from "components/route/paths";

const CheckInsPage: React.FC = () => {
  const history = useHistory();
  const user = useUser();

  const routes = useMemo(
    () => ({
      profile: () => {
        const url = paths.profileView.url({});
        history.push(url);
      },
      checkIn: (checkInId: string) => {
        const url = paths.checkInView.url({ checkInId });
        history.push(url);
      },
    }),
    [history]
  );

  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.profile}>Profile</BackButton>}
    />
  );

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return <UserCheckInsView nav={nav} routes={routes} userId={user.uid} />;
      }}
    </ErrorBoundary>
  );
};

export default CheckInsPage;
