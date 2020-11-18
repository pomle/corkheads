import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  CollectionItem: {
    alignItems: "center",
    background: "#fff",
    border: "solid 1px #e2e2e2",
    display: "flex",
    flexFlow: "column",
  },
  photo: {
    background: "#c9c9c9",
    overflow: "hidden",
    height: "85px",
    width: "100%",
    "& > img": {
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      width: "100%",
    },
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
  image: React.ReactNode;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ image, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.CollectionItem}>
      <div className={classes.photo}>{image}</div>
      <div className={classes.meta}>{children}</div>
    </div>
  );
};

export default CollectionItem;
