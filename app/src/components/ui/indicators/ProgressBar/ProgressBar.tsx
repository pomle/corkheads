import React from "react";
import { makeStyles } from "@material-ui/styles";
import { clamp } from "lib/math";

const useStyles = makeStyles({
  bar: {
    background: "#EAEAEA",
    width: "100%"
  },
  indicator: {
    background: "#5ADC9B",
    height: 3,
    width: (props: ProgressBarProps) => `${props.value * 100}%`
  }
});

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const repr = isFinite(value) ? clamp(value, 0, 1) : 0;
  const classes = useStyles({ value: repr });
  return (
    <div className={classes.bar}>
      <div className={classes.indicator} />
    </div>
  );
};

export default ProgressBar;
