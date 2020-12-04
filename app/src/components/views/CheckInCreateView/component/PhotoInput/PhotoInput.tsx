import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";
import { Colors } from "components/ui/theme/themes";
import { ReactComponent as CameraIcon } from "assets/graphics/icons/camera.svg";
import ImageSelect from "components/ui/trigger/ImageSelect";

type StyleProps = {
  hasPhoto: boolean;
};

const useStyles = makeStyles({
  PhotoInput: {
    "& > button": {
      width: "100%",
    },
  },
  canvas: {
    background: (props: StyleProps) => (props.hasPhoto ? "#000" : "none"),
    border: `dashed 1px ${Colors.MarbleBlue}`,
    borderRadius: "8px",
    overflow: "hidden",
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
});

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
            <Photo url={photoURL} size="contain">
              <div className="square" />
            </Photo>
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
