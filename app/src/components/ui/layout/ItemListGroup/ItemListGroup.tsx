import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {},
  head: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "30px 20px 15px 20px",
  },
  title: {
    fontSize: 24,
    fontWeight: 500,
  },
  content: {},
});

interface ItemListGroupProps {
  title: React.ReactNode;
  contextMenu?: React.ReactNode;
}

const ItemListGroup: React.FC<ItemListGroupProps> = ({
  title,
  contextMenu,
  children,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <header className={classes.head}>
        <div className={classes.title}>{title}</div>
        <div>{contextMenu}</div>
      </header>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default ItemListGroup;
