import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "../Photo";

const useStyles = makeStyles({
  CollectionItem: {
    alignItems: "center",
    background: "#fff",
    border: "solid 1px #e2e2e2",
    display: "flex",
    flexFlow: "column",
  },
  photo: {
    height: "85px",
    width: "100%",
  },
  meta: {
    color: "#5a5a5a",
    display: "grid",
    flex: "1",
    fontSize: "14px",
    fontWeight: 500,
    gridAutoFlow: "row",
    gridGap: "6px",
    lineHeight: 1.3,
    padding: "12px",
    textAlign: "center",
  },
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
      <div className={classes.meta}>{children}</div>
    </div>
  );
};

export default CollectionItem;
