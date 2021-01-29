import React, { Children } from "react";
import { makeStyles } from "@material-ui/styles";
import DividedList from "../DividedList";

type StyleProps = {
  padding: number;
};

const useStyles = makeStyles({
  ItemList: {
    margin: (props: StyleProps) => `-${props.padding}px 0`,
  },
  Item: {
    padding: (props: StyleProps) => `${props.padding}px 0`,
    "& > *": {
      display: "block",
      width: "100%",
    },
  },
});

interface ItemListProps {
  divided?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ children, divided = false }) => {
  const classes = useStyles({ padding: divided ? 12 : 8 });

  const items = Children.toArray(children).filter((x) => x);

  if (divided) {
    return (
      <div className={classes.ItemList}>
        <DividedList>
          {items.map((child) => {
            return <div className={classes.Item}>{child}</div>;
          })}
        </DividedList>
      </div>
    );
  }

  return (
    <div className={classes.ItemList}>
      {items.map((child) => {
        return <div className={classes.Item}>{child}</div>;
      })}
    </div>
  );
};

export default ItemList;
