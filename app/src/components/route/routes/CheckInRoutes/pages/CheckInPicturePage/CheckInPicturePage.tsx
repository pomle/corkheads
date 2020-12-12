import React from "react";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import PictureView from "components/views/PictureView";
import BusyView from "components/views/BusyView";
import AreaButton from "components/ui/trigger/AreaButton";
import ArticlePicturePage from "components/route/pages/ArticlePicturePage";
import { resolvePhoto } from "lib/resourceRouting";

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

  const imageRef = resolvePhoto(checkIn);

  if (!imageRef) {
    return <ArticlePicturePage routes={routes} articleId={checkIn.articleId} />;
  }

  return (
    <AreaButton onClick={routes.back}>
      <PictureView imageRef={imageRef} />
    </AreaButton>
  );
};

export default CheckInPicturePage;
