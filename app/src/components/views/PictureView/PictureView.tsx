import React from "react";
import { makeStyles } from "@material-ui/styles";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";
import ImageResource from "components/ui/layout/ImageResource";
import { ImageRef } from "types/ImageRef";

type StyleProps = {
  photoURL: string;
};

const useStyles = makeStyles({
  PictureView: {
    backgroundColor: "#000",
    // backgroundImage: (props: StyleProps) => `url(${props.photoURL})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
});

interface PictureViewProps {
  imageRef: ImageRef;
}

const PictureView: React.FC<PictureViewProps> = ({ imageRef }) => {
  const classes = useStyles();

  return (
    <FullScreenLayout>
      <div className={classes.PictureView}>
        <ImageResource imageRef={imageRef} />
      </div>
    </FullScreenLayout>
  );
};

export default PictureView;
