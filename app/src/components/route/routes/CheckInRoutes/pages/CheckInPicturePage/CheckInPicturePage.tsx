import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import PictureView from "components/views/PictureView";
import BusyView from "components/views/BusyView";
import AreaButton from "components/ui/trigger/AreaButton";
import * as paths from "components/route/paths";
import ArticlePicturePage from "../ArticlePicturePage";

interface CheckInPicturePageProps {
  checkInId: string;
}

const CheckInPicturePage: React.FC<CheckInPicturePageProps> = ({
  checkInId,
}) => {
  const history = useHistory();

  const goToCheckIn = useCallback(() => {
    const url = paths.checkInView.url({ checkInId });
    history.push(url);
  }, [history, checkInId]);

  const checkIn = useCheckIn(checkInId)?.data;

  if (!checkIn) {
    return <BusyView />;
  }

  if (!checkIn.photoURL) {
    return (
      <ArticlePicturePage checkInId={checkInId} articleId={checkIn.articleId} />
    );
  }

  return (
    <AreaButton onClick={goToCheckIn}>
      <PictureView photoURL={checkIn.photoURL} />
    </AreaButton>
  );
};

export default CheckInPicturePage;
