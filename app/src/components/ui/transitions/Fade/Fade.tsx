import React from "react";
import { makeStyles } from "@material-ui/styles";
import { TransitionEffectProps } from "../types";
import { pointerEvents } from "../states";

const opacity = ({ active }: TransitionEffectProps) => {
  return active ? 1 : 0;
};

const useStyles = makeStyles({
  Fade: {
    height: "100%",
    opacity,
    pointerEvents,
    transition: "opacity 0.5s ease",
  },
});

const Fade: React.FC<TransitionEffectProps> = ({ active, children }) => {
  const classes = useStyles({ active });
  return <div className={classes.Fade}>{children}</div>;
};

export default Fade;
