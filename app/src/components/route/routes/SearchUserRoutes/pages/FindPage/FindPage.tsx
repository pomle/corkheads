import React from "react";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import CancelButton from "components/ui/trigger/CancelButton/CancelButton";
import SearchUsersView from "components/views/SearchUsersView";

interface FindPageProps {
  routes: {
    user: (userId: string) => void;
    cancel: () => void;
  };
}

const FindPage: React.FC<FindPageProps> = ({ routes }) => {
  const nav = (
    <NavigationBar
      back={<CancelButton onClick={routes.cancel}>Close</CancelButton>}
    />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => <SearchUsersView nav={nav} routes={routes} />}
    </ErrorBoundary>
  );
};

export default FindPage;
