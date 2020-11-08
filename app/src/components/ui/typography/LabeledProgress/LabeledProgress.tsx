import React from "react";
import { makeStyles } from "@material-ui/styles";
import ProgressBar from "components/ui/indicators/ProgressBar";
import Percentage from "components/ui/format/Percentage";

const useStyles = makeStyles({
  root: {
    lineHeight: "1.4",
  },
  text: {
    display: "flex",
    justifyContent: "space-between",
  },
  label: {
    color: "#A8A8A8",
  },
  textValue: {
    color: "#999999",
  },
  bar: {
    alignItems: "center",
    display: "flex",
    height: "1.4em",
    justifyContent: "stretch",
  },
  percentage: {
    color: "#999999",
  },
});

interface LabeledProgressProps {
  label: React.ReactNode;
  value: number;
}

const LabeledProgress: React.FC<LabeledProgressProps> = ({ label, value }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.text}>
        <div>{label}</div>
        <div className={classes.percentage}>
          <Percentage fraction={value} />
        </div>
      </div>
      <div className={classes.bar}>
        <ProgressBar value={value} />
      </div>
    </div>
  );
};

export default LabeledProgress;
