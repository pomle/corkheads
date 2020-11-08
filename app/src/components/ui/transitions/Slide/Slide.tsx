import React from "react";
import { makeStyles } from "@material-ui/styles";
import { TransitionEffectProps } from "../types";

const transform = ({ active, direction }: SlideProps) => {
  if (active) {
    return "none";
  }

  const [x, y] = direction;

  return `translate(
    calc(${x * 100}% + ${x * 20}px),
    calc(${y * 100}% + ${y * 20}px)
  )`;
};

const useStyles = makeStyles({
  slide: {
    boxShadow: "0 0 20px -10px",
    height: "100%",
    transform,
    transition: "all 0.5s ease",
  },
});

export type Direction = [number, number];

interface SlideProps extends TransitionEffectProps {
  direction: Direction;
}

const Slide: React.FC<SlideProps> = ({ active, direction, children }) => {
  const classes = useStyles({ active, direction });
  return <div className={classes.slide}>{children}</div>;
};

export default Slide;
