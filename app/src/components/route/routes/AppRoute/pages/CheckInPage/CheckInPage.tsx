import React, { useCallback } from "react";
import { useArticleStore } from "components/hooks/db/useArticles";
import CheckInDetailsView from "components/views/CheckInDetailsView";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";
import * as paths from "components/route/paths";
import { useHistory } from "react-router-dom";
import { useCheckIn } from "components/hooks/db/useCheckIns";

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

  const checkInResult = useCheckIn(checkInId);
  const checkIn = checkInResult.data;
  const articleId = checkIn ? checkIn.data.articleId : undefined;

  const articlesResult = useArticleStore(articleId ? [articleId] : []);
  const article = articleId ? articlesResult.data[articleId] : undefined;

  if (checkInResult.busy || articlesResult.busy) {
    return <LoadingView nav={nav} />;
  }

  if (!checkIn || !article) {
    return <ErrorView nav={nav}>Not found</ErrorView>;
  }

  return <CheckInDetailsView nav={nav} checkIn={checkIn} article={article} />;
};

export default CheckInPage;
