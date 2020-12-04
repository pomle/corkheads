import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  ButtonField: {
    display: "grid",
    gridAutoFlow: "column",
    gridGap: 16,
    justifyContent: "stretch",
    "& button": {
      borderRadius: 0,
      fontSize: "18px",
      fontWeight: 700,
      padding: "24px",
    },
  },
});

const ButtonField: React.FC = ({ children }) => {
  const classes = useStyles();

  const nodes = React.Children.toArray(children).filter(
    (node) => node !== null
  );

  if (nodes.length === 0) {
    return null;
  }

  return <div className={classes.ButtonField}>{nodes}</div>;
};

export default ButtonField;
