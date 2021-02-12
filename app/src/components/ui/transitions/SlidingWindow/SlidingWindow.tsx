import React from "react";
import { makeStyles } from "@material-ui/styles";

const transform = ({ activeIndex, size }: SlidingWindowStyleProps) => {
  return `translate(
    ${activeIndex * -(100 / size)}%,
    0
  )`;
};

const useStyles = makeStyles({
  SlidingWindow: {
    height: "100%",
    overflow: "hidden",
  },
  container: {
    display: "flex",
    height: "100%",
    transform,
    transition: "all 0.3s ease",
    "& > *": {
      flex: "100%",
    },
    width: ({ size }: SlidingWindowStyleProps) => `${size * 100}%`,
  },
});

interface SlidingWindowStyleProps {
  activeIndex: number;
  size: number;
}

interface SlidingWindowProps {
  activeIndex: number;
  children: React.ReactElement[];
}

const SlidingWindow: React.FC<SlidingWindowProps> = ({
  activeIndex,
  children,
}) => {
  const classes = useStyles({ activeIndex, size: children.length });
  return (
    <div className={classes.SlidingWindow}>
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default SlidingWindow;
