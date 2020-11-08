import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    background: "#FFF",
    borderTop: (props: ItemListProps) =>
      props.caps ? "solid 1px #EAEAEA" : "none",
    borderBottom: (props: ItemListProps) =>
      props.caps ? "solid 1px #EAEAEA" : "none",
    "& > *": {
      borderBottom: "solid 1px #EAEAEA",
      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
});

interface ItemListProps {
  caps?: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ caps, children }) => {
  const classes = useStyles({ caps });

  return <div className={classes.root}>{children}</div>;
};

export default ItemList;
