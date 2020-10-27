import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  refresh: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -10,
    padding: 10
  }
});

const RefreshBar: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.refresh}>{children}</div>;
};

export default RefreshBar;
