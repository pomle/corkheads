import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  CollectionList: {
    display: "grid",
    gap: "16px",
    gridTemplateColumns: "repeat(auto-fit, minmax(154px, 1fr))",
    "& > *": {
      justifySelf: "center",
    },
  },
});

interface CollectionListProps {}

const CollectionList: React.FC<CollectionListProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.CollectionList}>{children}</div>;
};

export default CollectionList;
