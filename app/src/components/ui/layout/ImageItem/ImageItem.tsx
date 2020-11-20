import React from "react";
import { makeStyles } from "@material-ui/styles";

type StyleProps = {
  imageURL?: string;
};

function backgroundImage({ imageURL }: StyleProps) {
  if (imageURL) {
    return `url(${imageURL})`;
  }
  return "none";
}

const useStyles = makeStyles({
  ImageItem: {
    alignItems: "center",
    background: "#fff",
    display: "flex",
  },
  photo: {
    background: "#c9c9c9",
    backgroundImage,
    backgroundPosition: "center",
    backgroundSize: "cover",
    overflow: "hidden",
    height: "85px",
    width: "85px",
    "& > img": {
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      width: "100%",
    },
  },
  meta: {
    color: "#5a5a5a",
    display: "grid",
    flex: "1",
    gridAutoFlow: "row",
    gridGap: "6px",
    lineHeight: 1,
    padding: "14px 16px",
  },
});

interface ImageItemProps {
  imageURL?: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ imageURL, children }) => {
  const classes = useStyles({ imageURL });
  return (
    <div className={classes.ImageItem}>
      <div className={classes.photo} />
      <div className={classes.meta}>{children}</div>
    </div>
  );
};

export default ImageItem;
