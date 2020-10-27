import React from "react";
import { makeStyles } from "@material-ui/styles";
import { TransitionEffectProps } from "../types";

const opacity = ({ active }: TransitionEffectProps) => {
  return active ? 1 : 0;
};

const useStyles = makeStyles({
  fade: {
    height: "100%",
    opacity,
    transition: "opacity 0.5s ease"
  }
});

const Fade: React.FC<TransitionEffectProps> = ({ active, children }) => {
  const classes = useStyles({ active });
  return <div className={classes.fade}>{children}</div>;
};

export default Fade;
