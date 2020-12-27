import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  ImageItem: {
    alignItems: "center",
    background: theme.color.surface,
    color: theme.color.text,
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr)",
    gridGap: "16px",
  },
  photo: {
    background: theme.color.panel,
    borderRadius: "20px",
    overflow: "hidden",
    height: "64px",
    width: "64px",
  },
}));

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
      {children}
    </div>
  );
};

export default ImageItem;
