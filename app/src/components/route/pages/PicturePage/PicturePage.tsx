import React from "react";
import PictureView from "components/views/PictureView";
import AreaButton from "components/ui/trigger/AreaButton";

interface PicturePageProps {
  imageId: string;
  routes: {
    back: () => void;
  };
}

const PicturePage: React.FC<PicturePageProps> = ({ imageId, routes }) => {
  return (
    <AreaButton onClick={routes.back}>
      <PictureView imageId={imageId} />
    </AreaButton>
  );
};

export default PicturePage;
