import React, { Children } from "react";
import { makeStyles } from "@material-ui/styles";
import DividedList from "../DividedList";

const useStyles = makeStyles({
  ItemList: {
    margin: "-12px 0",
  },
  Item: {
    padding: "12px 0",
    "& > *": {
      display: "block",
      width: "100%",
    },
  },
});

interface ItemListProps {}

const ItemList: React.FC<ItemListProps> = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.ItemList}>
      <DividedList>
        {Children.map(children, (child) => {
          return <div className={classes.Item}>{child}</div>;
        })}
      </DividedList>
    </div>
  );
};

export default ItemList;
