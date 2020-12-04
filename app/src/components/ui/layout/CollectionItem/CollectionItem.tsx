import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "../Photo";

const useStyles = makeStyles({
  CollectionItem: {
    alignItems: "center",
    background: "#fff",
    border: "solid 1px #e2e2e2",
    borderRadius: "16px",
    boxShadow: "0 0 10px #fdfdfd",
    display: "flex",
    flexFlow: "column",
    height: "100%",
    padding: "4px",
  },
  photo: {
    borderRadius: "12px",
    overflow: "hidden",
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
