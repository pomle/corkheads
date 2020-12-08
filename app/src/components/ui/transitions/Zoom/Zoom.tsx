import React from "react";
import { makeStyles } from "@material-ui/styles";
import { TransitionEffectProps } from "../types";

const transform = ({ active, direction }: SlideProps) => {
  if (active) {
    return "none";
  }

  const [x, y] = direction;

  return `
    translate(
      ${x * 100}%,
      ${y * 100}%
    )
    scale(0.5)
  `;
};

const useStyles = makeStyles({
  Zoom: {
    height: "100%",
    opacity: (props) => (props.active ? 1 : 0),
    pointerEvents: (props) => (props.active ? "all" : "none"),
    transform,
    transition: "all 0.3s ease",
  },
});

export type Direction = [number, number];

interface SlideProps extends TransitionEffectProps {
  direction: Direction;
}

const Zoom: React.FC<SlideProps> = ({ active, direction, children }) => {
  const classes = useStyles({ active, direction });
  return <div className={classes.Zoom}>{children}</div>;
};

export default Zoom;
