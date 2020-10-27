import React from "react";
import { makeStyles } from "@material-ui/styles";
import LineThrobber from "../LineThrobber";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex",
    flexFlow: "column",
    height: 200,
    justifyContent: "center"
  },
  throbber: {
    margin: 20,
    width: "60%"
  },
  message: {
    fontSize: 20,
    fontWeight: 500
  }
});

interface LoadingMessageProps {
  message: React.ReactNode;
}

const LoadingMessage: React.FC<LoadingMessageProps> = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.throbber}>
        <LineThrobber />
      </div>

      <div className={classes.message}>{message}</div>
    </div>
  );
};

export default LoadingMessage;
