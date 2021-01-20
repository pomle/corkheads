import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import Image from "components/ui/layout/Image";
import { useImage } from "components/hooks/db/useImages";

const useStyles = makeStyles((theme: Theme) => ({
  CutoutImageItem: {
    alignItems: "center",
    background: theme.color.surface,
    borderRadius: "8px",
    color: theme.color.text,
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "80px auto",
    minHeight: "80px",
    overflow: "hidden",
  },
  photo: {
    background: theme.color.panel,
    height: "100%",
    width: "100%",
  },
}));

interface CutoutImageItemProps {
  imageId?: string;
  photoURL?: string;
}

const CutoutImageItem: React.FC<CutoutImageItemProps> = ({
  imageId,
  photoURL,
  children,
}) => {
  const image = useImage(imageId)?.data || photoURL;

  const classes = useStyles();

  return (
    <div className={classes.CutoutImageItem}>
      <div className={classes.photo}>
        <Image image={image} size="20vw" />
      </div>
      {children}
    </div>
  );
};

export default CutoutImageItem;
