import React from "react";
import Slide, { Direction } from "./Slide";

export default Slide;

export const SlideDirection: {[key: string]: Direction} = {
  Up: [0, -1],
  Down: [0, 1],
  Left: [-1, 0],
  Right: [1, 0]
};

const bindDirection = (direction: Direction): React.FC<{ active: boolean }> => {
  return ({ active, children }) =>
    React.createElement(Slide, { direction, active }, children);
};

export const SlideDown = bindDirection(SlideDirection.Down);
export const SlideRight = bindDirection(SlideDirection.Right);
