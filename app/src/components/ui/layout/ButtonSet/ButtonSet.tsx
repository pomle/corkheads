import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ButtonSet: {
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "stretch",
    gridGap: 16,
  },
});

const ButtonSet: React.FC = ({ children }) => {
  const classes = useStyles();

  const nodes = React.Children.toArray(children).filter(
    (node) => node !== null
  );

  if (nodes.length === 0) {
    return null;
  }

  return <div className={classes.ButtonSet}>{nodes}</div>;
};

export default ButtonSet;
