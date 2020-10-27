import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "start",
    gridGap: 16
  }
});

const ButtonSet: React.FC = ({ children }) => {
  const classes = useStyles();

  const nodes = React.Children.toArray(children).filter(node => node !== null);

  if (nodes.length === 0) {
    return null;
  }

  return <div className={classes.root}>{nodes}</div>;
};

export default ButtonSet;
