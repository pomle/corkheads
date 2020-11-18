import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  CollectionList: {
    background: "#fff",
    display: "grid",
    gridGap: "16px",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "16px",
  },
});

interface CollectionListProps {}

const CollectionList: React.FC<CollectionListProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.CollectionList}>{children}</div>;
};

export default CollectionList;
