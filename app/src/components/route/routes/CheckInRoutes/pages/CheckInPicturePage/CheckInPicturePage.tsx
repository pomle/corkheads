import React from "react";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { useArticle } from "components/hooks/db/useArticles";
import LoadingView from "components/views/LoadingView";
import ErrorView from "components/views/ErrorView";
import BackButton from "components/ui/trigger/BackButton";
import PicturePage from "components/route/pages/PicturePage";

interface CheckInPicturePageProps {
  checkInId: string;
  routes: {
    back: () => void;
  };
}

const CheckInPicturePage: React.FC<CheckInPicturePageProps> = ({
  checkInId,
  routes,
}) => {
  const checkIn = useCheckIn(checkInId)?.data;
  const article = useArticle(checkIn?.articleId)?.data;

  const nav = {
    back: <BackButton onClick={routes.back}>Back</BackButton>,
  };

  if (!checkIn) {
    return <LoadingView nav={nav} />;
  }

  if (!checkIn?.imageId && !article) {
    return <LoadingView nav={nav} />;
  }

  const imageId = checkIn?.imageId || article?.imageId;

  if (!imageId) {
    return <ErrorView nav={nav}>No photo</ErrorView>;
  }

  return <PicturePage imageId={imageId} />;
};

export default CheckInPicturePage;
