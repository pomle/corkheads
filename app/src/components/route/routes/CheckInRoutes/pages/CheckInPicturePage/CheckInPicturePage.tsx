import React from "react";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import PictureView from "components/views/PictureView";
import BusyView from "components/views/BusyView";
import AreaButton from "components/ui/trigger/AreaButton";
import ArticlePicturePage from "components/route/pages/ArticlePicturePage";

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

  if (!checkIn) {
    return <BusyView />;
  }

  if (!checkIn.photoURL) {
    return <ArticlePicturePage routes={routes} articleId={checkIn.articleId} />;
  }

  return (
    <AreaButton onClick={routes.back}>
      <PictureView photoURL={checkIn.photoURL} />
    </AreaButton>
  );
};

export default CheckInPicturePage;
