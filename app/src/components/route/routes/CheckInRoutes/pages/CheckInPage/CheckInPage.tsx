import React, { useCallback, useMemo } from "react";
import { useArticles } from "components/hooks/db/useArticles";
import CheckInDetailsView from "components/views/CheckInDetailsView";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import ErrorBoundary from "components/views/ErrorBoundaryView";

const CheckInPage: React.FC<{ checkInId: string }> = ({ checkInId }) => {
  const history = useHistory();

  const goToProfile = useCallback(() => {
    const url = paths.profileView.url({});
    history.push(url);
  }, [history]);

  const nav = (
    <NavigationBar
      back={<BackButton onClick={goToProfile}>Profile</BackButton>}
    />
  );

  const checkInEntry = useCheckIn(checkInId);
  const articleId = checkInEntry ? checkInEntry?.data?.articleId : undefined;

  const articleEntries = useArticles(articleId ? [articleId] : []);
  const articleEntry = articleId && articleEntries && articleEntries[articleId];

  const routes = useMemo(
    () => ({
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

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (!articleEntry || !checkInEntry) {
          return <LoadingView nav={nav} />;
        }

        const checkIn = checkInEntry.data;
        const article = articleEntry.data;

        if (!checkIn || !article) {
          return <ErrorView nav={nav}>Not found</ErrorView>;
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
