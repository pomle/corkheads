import React from "react";
import { makeStyles } from "@material-ui/styles";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import Image from "components/ui/layout/Image";
import { useImage } from "components/hooks/db/useImages";
import AreaButton from "components/ui/trigger/AreaButton";
import { useBack } from "components/context/ScreenContext";

const useStyles = makeStyles({
  PictureView: {
    backgroundColor: "#000",
  },
});

interface PictureViewProps {
  imageId?: string;
}

const PictureView: React.FC<PictureViewProps> = ({ imageId }) => {
  const goBack = useBack();
  const image = useImage(imageId)?.data;
  const classes = useStyles();

  return (
    <AreaButton onClick={goBack}>
      <FullScreenLayout>
        <div className={classes.PictureView}>
          <Image image={image} fit="contain" size="100vw" />
        </div>
      </FullScreenLayout>
    </AreaButton>
  );
};

export default PictureView;
