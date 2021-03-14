import React from "react";
import PictureView from "components/views/PictureView";
import AreaButton from "components/ui/trigger/AreaButton";
import { useRoute } from "components/route/Screen";

interface PicturePageProps {
  imageId: string;
}

const PicturePage: React.FC<PicturePageProps> = ({ imageId }) => {
  const route = useRoute();
  return (
    <AreaButton onClick={route.back}>
      <PictureView imageId={imageId} />
    </AreaButton>
  );
};

export default PicturePage;
