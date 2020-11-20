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
  Photo: {
    background: "#c9c9c9",
    backgroundImage,
    backgroundPosition: "center",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  },
});

interface PhotoProps {
  url?: string;
}

const Photo: React.FC<PhotoProps> = ({ url, children }) => {
  const classes = useStyles({ imageURL: url });
  return <div className={classes.Photo} />;
};

export default Photo;
