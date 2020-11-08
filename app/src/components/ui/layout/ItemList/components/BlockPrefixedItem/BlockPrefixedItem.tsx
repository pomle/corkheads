import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
  prefix: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "65px",
  },
  content: {
    flex: "1",
    minHeight: 50,
    padding: "10px 20px 10px 0",
  },
});

interface BlockPrefixedItemProps {
  prefix: React.ReactNode;
}

const BlockPrefixedItem: React.FC<BlockPrefixedItemProps> = ({
  prefix,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.prefix}>{prefix}</div>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default BlockPrefixedItem;
