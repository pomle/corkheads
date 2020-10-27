import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  message: {
    background: "rgb(255, 196, 55)",
    borderRadius: 10,
    color: "white",
    padding: "16px 24px"
  }
});

const AlertMessage: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.message}>{children}</div>;
};

export default AlertMessage;
