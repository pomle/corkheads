import React from "react";
import { useArticle } from "components/hooks/db/useArticles";
import CheckInDetailsView from "components/views/CheckInDetailsView";
import LoadingView from "components/views/LoadingView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import { useUser } from "components/hooks/db/useUsers";

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
  const articleEntry = useArticle(checkInEntry?.data?.articleId);
  const userEntry = useUser(checkInEntry?.data?.userId);

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        const checkIn = checkInEntry?.data;
        const article = articleEntry?.data;
        const user = userEntry?.data;

        if (!checkIn || !article || !user) {
          return <LoadingView nav={nav} />;
        }

        return (
          <CheckInDetailsView
            nav={nav}
            routes={routes}
            checkIn={checkIn}
            article={article}
            user={user}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default CheckInPage;
