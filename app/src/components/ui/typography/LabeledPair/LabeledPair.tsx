import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    lineHeight: "1.4",
  },
  label: {
    color: "#999999",
  },
});

interface LabeledPairProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

const LabeledPair: React.FC<LabeledPairProps> = ({ label, value }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.label}>{label}</div>
      <div>{value}</div>
    </div>
  );
};

export default LabeledPair;
