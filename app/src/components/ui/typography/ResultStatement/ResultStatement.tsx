import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    color: "#838383",
    display: "flex",
    fontSize: "22px",
    fontWeight: 400,
    justifyContent: "center",
    margin: "16px auto",
    textAlign: "center",
    width: "260px",
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
