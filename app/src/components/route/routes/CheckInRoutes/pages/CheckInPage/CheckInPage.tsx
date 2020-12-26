import React from "react";
import CheckInDetailsView from "components/views/CheckInDetailsView";
import LoadingView from "components/views/LoadingView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import ErrorBoundary from "components/views/ErrorBoundaryView";

interface CheckInPageProps {
  checkInId: string;
  routes: {
    back: () => void;
    article: (articleId: string) => void;
    user: (userId: string) => void;
    picture: () => void;
  };
}

const CheckInPage: React.FC<CheckInPageProps> = ({ checkInId, routes }) => {
  const nav = (
    <NavigationBar back={<BackButton onClick={routes.back}>Back</BackButton>} />
  );

  const checkInEntry = useCheckIn(checkInId);

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        const checkIn = checkInEntry?.data;

        if (!checkIn) {
          return <LoadingView nav={nav} />;
        }

        return (
          <CheckInDetailsView
            nav={nav}
            routes={routes}
            checkInId={checkIn.id}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default CheckInPage;
