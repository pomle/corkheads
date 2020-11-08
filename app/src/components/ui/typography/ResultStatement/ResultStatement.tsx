import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    color: "#BBB",
    display: "flex",
    fontSize: 20,
    fontWeight: 500,
    justifyContent: "center",
    padding: 40,
    textAlign: "center",
  },
});

interface ResultStatementProps {
  message: React.ReactNode;
}

const ResultStatement: React.FC<ResultStatementProps> = ({ message }) => {
  const classes = useStyles();

  return <div className={classes.root}>{message}</div>;
};

export default ResultStatement;
