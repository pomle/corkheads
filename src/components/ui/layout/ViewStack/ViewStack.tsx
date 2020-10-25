import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    height: "100%",
    overflow: "hidden",
    position: "relative",
    pointerEvents: "none",
    "& > *": {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0
    }
  }
});

const ViewStack: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default ViewStack;
