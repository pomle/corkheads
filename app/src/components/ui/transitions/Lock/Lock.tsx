import React from "react";
import { makeStyles } from "@material-ui/styles";
import { TransitionEffectProps } from "../types";

const filter = ({ active }: TransitionEffectProps) => {
  if (active) {
    return "none";
  }
  return "brightness(0.8) grayscale(0.6)";
};

const useStyles = makeStyles({
  Lock: {
    filter,
    height: "100%",
    pointerEvents: (props: TransitionEffectProps) =>
      props.active ? "all" : "none",
    transition: "filter 0.3s ease",
  },
});

const Lock: React.FC<TransitionEffectProps> = ({ active, children }) => {
  const classes = useStyles({ active });
  return <div className={classes.Lock}>{children}</div>;
};

export default Lock;
