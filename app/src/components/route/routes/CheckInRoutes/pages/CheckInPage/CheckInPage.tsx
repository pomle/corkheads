import React, { useMemo } from "react";
import { useArticle } from "components/hooks/db/useArticles";
import CheckInDetailsView from "components/views/CheckInDetailsView";
import LoadingView from "components/views/LoadingView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import ErrorBoundary from "components/views/ErrorBoundaryView";

const CheckInPage: React.FC<{ checkInId: string }> = ({ checkInId }) => {
  const history = useHistory();

  const routes = useMemo(
    () => ({
      profile: () => {
        const url = paths.profileView.url({});
        history.push(url);
      },
      picture: () => {
        const url = paths.checkInPicture.url({ checkInId });
        history.push(url);
      },
      article: (articleId: string) => {
        const url = paths.articleView.url({ articleId });
        history.push(url);
      },
    }),
    [checkInId, history]
  );

  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.profile}>Profile</BackButton>}
    />
  );

  const checkInEntry = useCheckIn(checkInId);
  const articleEntry = useArticle(checkInEntry?.data?.articleId);

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        const checkIn = checkInEntry?.data;
        const article = articleEntry?.data;

        if (!checkIn || !article) {
          return <LoadingView nav={nav} />;
        }

        return (
          <CheckInDetailsView
            nav={nav}
            routes={routes}
            checkIn={checkIn}
            article={article}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default CheckInPage;
