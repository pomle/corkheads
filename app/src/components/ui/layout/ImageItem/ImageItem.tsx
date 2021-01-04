import React from "react";
import { makeStyles } from "@material-ui/styles";
import Image from "components/ui/layout/Image";
import { Theme } from "components/ui/theme/themes";
import { useImage } from "components/hooks/db/useImages";

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
  imageId?: string;
  imageURL?: string;
}

const ImageItem: React.FC<ImageItemProps> = ({
  imageId,
  imageURL,
  children,
}) => {
  const image = useImage(imageId)?.data || imageURL;

  const classes = useStyles();
  return (
    <div className={classes.ImageItem}>
      <div className={classes.photo}>
        <Image image={image} size="20vw" />
      </div>
      {children}
    </div>
  );
};

export default ImageItem;
