import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    alignItems: "center",
    display: "flex"
  },
  value: {
    color: "#999999",
    flex: "1 1",
    textAlign: "right"
  }
});

interface NameValuePairProps {
  label: React.ReactNode;
}

const NameValuePair: React.FC<NameValuePairProps> = ({ label, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>{label}</div>
      <div className={classes.value}>{children}</div>
    </div>
  );
};

export default NameValuePair;
