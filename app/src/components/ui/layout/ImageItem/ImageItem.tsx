import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ImageItem: {
    alignItems: "center",
    background: "#fff",
    display: "flex",
  },
  photo: {
    background: "#c9c9c9",
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
  image: React.ReactNode;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.ImageItem}>
      <div className={classes.photo}>{image}</div>
      <div className={classes.meta}>{children}</div>
    </div>
  );
};

export default ImageItem;
