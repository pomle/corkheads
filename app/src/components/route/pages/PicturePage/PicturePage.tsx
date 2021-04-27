import React from "react";
import PictureView from "components/views/PictureView";
import AreaButton from "components/ui/trigger/AreaButton";
import { useBack } from "components/context/ScreenContext";

interface PicturePageProps {
  imageId?: string;
  routes?: {
    back: () => void;
  };
}

const PicturePage: React.FC<PicturePageProps> = ({ imageId, routes }) => {
  const goBack = useBack();

  return (
    <AreaButton onClick={routes?.back ?? goBack}>
      <PictureView imageId={imageId} />
    </AreaButton>
  );
};

export default PicturePage;
