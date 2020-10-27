import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ReactComponent as CheckIcon } from "./assets/check.svg";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex"
  },
  content: {
    flex: "1"
  },
  icon: {
    display: "flex",
    flex: "0 1 24px",
    justifyContent: "flex-end"
  }
});

interface ActiveSelectionProps {
  checked?: boolean;
}

const ActiveSelection: React.FC<ActiveSelectionProps> = ({
  checked,
  children
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
      <div className={classes.icon}>{checked && <CheckIcon />}</div>
    </div>
  );
};

export default ActiveSelection;
