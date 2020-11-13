import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ItemList: {
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "2px",
  },
});

interface ItemListProps {}

const ItemList: React.FC<ItemListProps> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.ItemList}>{children}</div>;
};

export default ItemList;
