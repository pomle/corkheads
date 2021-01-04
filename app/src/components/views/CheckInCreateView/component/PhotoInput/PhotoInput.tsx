import React from "react";
import { makeStyles } from "@material-ui/styles";
import Image from "components/ui/layout/Image";
import { ReactComponent as CameraIcon } from "assets/graphics/icons/camera.svg";
import ImageSelect from "components/ui/trigger/ImageSelect";
import { Theme } from "components/ui/theme/themes";

type StyleProps = {
  hasPhoto: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  PhotoInput: {
    "& > button": {
      display: "block",
      width: "100%",
    },
  },
  canvas: {
    background: (props: StyleProps) =>
      props.hasPhoto ? "#000" : theme.color.panel,
    position: "relative",
    "& .preview": {
      position: "relative",
      zIndex: 2,
    },
    "& button": {
      width: "100%",
    },
    "& .square": {
      paddingTop: "100%",
    },
    "& .icon": {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      height: "100%",
      position: "absolute",
      top: 0,
      width: "100%",
      zIndex: 1,
      "& svg": {
        heigth: "64px",
        width: "64px",
      },
    },
  },
}));

interface PhotoInputProps {
  photoURL?: string;
  onFile: (file: File) => void;
}

const PhotoInput: React.FC<PhotoInputProps> = ({ photoURL, onFile }) => {
  const classes = useStyles({ hasPhoto: !!photoURL });

  return (
    <div className={classes.PhotoInput}>
      <ImageSelect onFile={onFile}>
        <div className={classes.canvas}>
          <div className="preview">
            <Image image={photoURL} fit="contain" />
          </div>
          <div className="icon">
            <CameraIcon />
          </div>
        </div>
      </ImageSelect>
    </div>
  );
};

export default PhotoInput;
