import React from "react";
import ItemListItem from "components/ui/layout/ItemListItem";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  action: {},
});

interface ActionableItemProps {
  action: React.ReactNode;
}

const ActionableItem: React.FC<ActionableItemProps> = ({
  children,
  action,
}) => {
  const classes = useStyles();

  return (
    <ItemListItem>
      <div className={classes.root}>
        <div className={classes.content}>{children}</div>
        <div className={classes.action}>{action}</div>
      </div>
    </ItemListItem>
  );
};

export default ActionableItem;
