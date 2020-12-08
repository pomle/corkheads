import React from "react";
import { makeStyles } from "@material-ui/styles";
import FullScreenLayout from "components/ui/layout/FullScreenLayout";

type StyleProps = {
  photoURL: string;
};

const useStyles = makeStyles({
  PictureView: {
    backgroundColor: "#000",
    backgroundImage: (props: StyleProps) => `url(${props.photoURL})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
});

interface PictureViewProps {
  photoURL: string;
}

const PictureView: React.FC<PictureViewProps> = ({ photoURL }) => {
  const classes = useStyles({ photoURL });

  return (
    <FullScreenLayout>
      <div className={classes.PictureView}></div>
    </FullScreenLayout>
  );
};

export default PictureView;
