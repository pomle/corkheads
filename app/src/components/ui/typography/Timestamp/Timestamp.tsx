import React from "react";
import { makeStyles } from "@material-ui/styles";

const COLOR_GREEN_FADED = "#5ADC9B80";
const COLOR_NONE = "transparent";

export enum TimestampState {
  Normal,
  Confirmed,
}

const setBackgroundColor = ({ state }: TimestampProps) => {
  if (state === TimestampState.Confirmed) {
    return COLOR_GREEN_FADED;
  }
  return "none";
};

const setBorderColor = ({ state }: TimestampProps) => {
  if (state === TimestampState.Confirmed) {
    return COLOR_NONE;
  }
  return "#999999";
};

const setColor = () => {
  return "#2A2A2A";
};

const useStyles = makeStyles({
  root: {
    backgroundColor: setBackgroundColor,
    border: "1px solid",
    borderColor: setBorderColor,
    borderRadius: 3,
    color: setColor,
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: "18px",
    padding: 2,
    textAlign: "center",
  },
});

interface TimestampProps {
  state?: TimestampState;
}

const Timestamp: React.FC<TimestampProps> = ({
  children,
  state = TimestampState.Normal,
}) => {
  const classes = useStyles({ state });

  return <div className={classes.root}>{children}</div>;
};

export default Timestamp;
