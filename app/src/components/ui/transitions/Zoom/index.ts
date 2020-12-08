import React from "react";
import Zoom, { Direction } from "./Zoom";

export default Zoom;

const bindDirection = (direction: Direction): React.FC<{ active: boolean }> => {
  return ({ active, children }) =>
    React.createElement(Zoom, { direction, active }, children);
};

export const ZoomCenter = bindDirection([0, 0]);
