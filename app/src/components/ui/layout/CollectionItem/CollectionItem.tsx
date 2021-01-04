import React from "react";
import { makeStyles } from "@material-ui/styles";
import Image from "components/ui/layout/Image";
import { Theme } from "components/ui/theme/themes";
import { useImage } from "components/hooks/db/useImages";

const useStyles = makeStyles((theme: Theme) => ({
  CollectionItem: {
    alignItems: "center",
    background: theme.color.surface,
    borderRadius: "8px",
    color: theme.color.text,
    display: "flex",
    flexFlow: "column",
    overflow: "hidden",
    height: "100%",
    width: "100%",
  },
  photo: {
    background: theme.color.panel,
    height: "136px",
    width: "100%",
  },
}));

interface CollectionItemProps {
  imageId?: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  imageId,
  children,
}) => {
  const image = useImage(imageId)?.data;

  const classes = useStyles();

  return (
    <div className={classes.CollectionItem}>
      <div className={classes.photo}>
        <Image image={image} size="50vw" />
      </div>
      {children}
    </div>
  );
};

export default CollectionItem;
