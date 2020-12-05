import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "../Photo";

const useStyles = makeStyles({
  ImageItem: {
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    gridGap: "16px",
  },
  photo: {
    background: "#fff1",
    borderRadius: "20px",
    overflow: "hidden",
    height: "64px",
    width: "64px",
  },
  meta: {
    color: "#5a5a5a",
    display: "grid",
    flex: "1",
    gridAutoFlow: "row",
    gridGap: "4px",
    lineHeight: 1,
  },
});

interface ImageItemProps {
  imageURL?: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ imageURL, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.ImageItem}>
      <div className={classes.photo}>
        <Photo url={imageURL} />
      </div>
      <div className={classes.meta}>{children}</div>
    </div>
  );
};

export default ImageItem;
