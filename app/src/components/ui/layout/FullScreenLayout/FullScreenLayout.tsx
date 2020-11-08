import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100%",
    pointerEvents: "all",
    "& > div": {
      flex: "1",
    },
  },
});

const FullScreenLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default FullScreenLayout;
