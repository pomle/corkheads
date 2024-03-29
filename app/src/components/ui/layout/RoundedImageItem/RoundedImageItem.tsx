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
    gridGap: "16px",
    gridTemplateColumns: "80px auto",
  },
  photo: {
    background: theme.color.panel,
    borderRadius: "50%",
    overflow: "hidden",
    height: "80px",
    width: "80px",
    "-webkit-mask-image": "-webkit-radial-gradient(white, black)",
  },
  content: {},
}));

interface RoundedImageItemProps {
  imageId?: string;
  photoURL?: string;
  placeholderURL?: string;
}

const RoundedImageItem: React.FC<RoundedImageItemProps> = ({
  children,
  imageId,
  photoURL,
  placeholderURL,
}) => {
  const image = useImage(imageId)?.data || photoURL;

  const classes = useStyles();

  return (
    <div className={classes.RoundedImageItem}>
      <div className={classes.photo}>
        <Image image={image} placeholder={placeholderURL} size="20vw" />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default RoundedImageItem;
