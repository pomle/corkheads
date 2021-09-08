import React from "react";
import { makeStyles } from "@material-ui/styles";

type StyleProps = {
  active: boolean;
};

function pointerEvents(props: StyleProps) {
  return props.active ? "all" : "none";
}

const filter = ({ active }: StyleProps) => {
  if (active) {
    return "none";
  }
  return "brightness(0.8) grayscale(0.6)";
};

const useStyles = makeStyles({
  Lock: {
    filter,
    height: "100%",
    pointerEvents,
    transition: "filter 0.3s ease",
  },
});

interface LockProps {
  active: boolean;
}

const Lock: React.FC<LockProps> = ({ active, children }) => {
  const classes = useStyles({ active });
  return <div className={classes.Lock}>{children}</div>;
};

export default Lock;
