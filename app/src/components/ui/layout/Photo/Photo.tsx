import React from "react";
import { makeStyles } from "@material-ui/styles";

type Size = "cover" | "contain";

type StyleProps = {
  imageURL?: string;
  size: Size;
};

function backgroundImage({ imageURL }: StyleProps) {
  if (imageURL) {
    return `url(${imageURL})`;
  }
  return "none";
}

const useStyles = makeStyles({
  Photo: {
    backgroundImage,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: (props: StyleProps) => props.size,
    height: "100%",
    width: "100%",
  },
});

interface PhotoProps {
  url?: string;
  size?: Size;
}

const Photo: React.FC<PhotoProps> = ({ url, size = "cover" }) => {
  const classes = useStyles({ imageURL: url, size });
  return <div className={classes.Photo} />;
};

export default Photo;
