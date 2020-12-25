import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Colors } from "components/ui/theme/colors";
import Photo from "../Photo";

const useStyles = makeStyles({
  CollectionItem: {
    alignItems: "center",
    background: Colors.Sky,
    borderRadius: "12px",
    display: "flex",
    flexFlow: "column",
    overflow: "hidden",
    height: "100%",
    width: "min-content",
  },
  photo: {
    background: Colors.X2,
    height: "144px",
    width: "144px",
  },
  content: {},
});

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
