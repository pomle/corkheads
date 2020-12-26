import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "../Photo";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  CollectionItem: {
    alignItems: "center",
    background: theme.color.surface,
    borderRadius: "8px",
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
  content: {
    color: theme.color.text,
  },
}));

interface CollectionItemProps {
  imageURL?: string;
}

const CollectionItem: React.FC<CollectionItemProps> = ({
  imageURL,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.CollectionItem}>
      <div className={classes.photo}>
        <Photo url={imageURL} />
      </div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default CollectionItem;
