import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  message: {
    background: "rgb(252, 92, 99)",
    borderRadius: 10,
    color: "white",
    padding: "16px 24px",
  },
});

const ErrorMessage: React.FC = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.message}>{children}</div>;
};

export default ErrorMessage;
