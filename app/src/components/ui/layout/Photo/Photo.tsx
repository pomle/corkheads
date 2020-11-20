import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Photo: {
    background: "#c9c9c9",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    "& > img": {
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      width: "100%",
    },
  },
});

interface PhotoProps {
  image: React.ReactNode;
}

const Photo: React.FC<PhotoProps> = ({ image, children }) => {
  const classes = useStyles();
  return <div className={classes.Photo}>{image}</div>;
};

export default Photo;
