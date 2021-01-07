import React from "react";
import { makeStyles } from "@material-ui/styles";
import Image from "components/ui/layout/Image";
import { useImage } from "components/hooks/db/useImages";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  RoundedImageItem: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "64px auto",
  },
  photo: {
    background: theme.color.panel,
    borderRadius: "50%",
    overflow: "hidden",
    height: "64px",
    width: "64px",
  },
  content: {},
}));

interface RoundedImageItemProps {
  imageId?: string;
  photoURL?: string;
}

const RoundedImageItem: React.FC<RoundedImageItemProps> = ({
  children,
  imageId,
  photoURL,
}) => {
  const image = useImage(imageId)?.data || photoURL;

  const classes = useStyles();

  return (
    <div className={classes.RoundedImageItem}>
      <div className={classes.photo}>
        <Image image={image} size="20vw" />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default RoundedImageItem;
