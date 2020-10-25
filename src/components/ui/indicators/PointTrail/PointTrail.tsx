import React from "react";
import { Vec } from "lib/math";

type Point = [number, number];

interface PointTrailProps {
  points: Point[];
  color: string;
}

const getBounds = (numbers: number[]): [number, number] => {
  if (numbers.length < 2) {
    return [0, 0];
  }
  return [Math.min(...numbers), Math.max(...numbers)];
};

const PointTrail: React.FC<PointTrailProps> = ({ points, color }) => {
  const radius = 4;
  const gutter = radius + 2;
  const margin = radius + 1;
  const boundsX = getBounds(points.map(p => p[0]));
  const boundsY = getBounds(points.map(p => p[1]));
  const offsetX = margin - boundsX[0];
  const offsetY = margin - boundsY[0];
  const width = boundsX[1] - boundsX[0];
  const height = boundsY[1] - boundsY[0];

  const lines: [Point, Point][] = [];
  for (let i = 1; i < points.length; i += 1) {
    const [p1, p2] = points.slice(i - 1, i + 2);
    const v1 = new Vec(...p1);
    const v2 = new Vec(...p2);
    const v = new Vec(v2.x - v1.x, v2.y - v1.y);
    v.length = gutter;
    v1.add(v);
    v2.subtract(v);
    lines.push([
      [v1.x, v1.y],
      [v2.x, v2.y]
    ]);
  }

  return (
    <svg width={width + margin * 2} height={height + margin * 2}>
      <g transform={`translate(${offsetX} ${offsetY})`}>
        {points.map((point, index) => {
          return (
            <circle
              key={index}
              cx={point[0]}
              cy={point[1]}
              r={radius}
              fill={color}
            />
          );
        })}
        {lines.map(([p1, p2], index) => {
          return (
            <line
              key={index}
              x1={p1[0]}
              y1={p1[1]}
              x2={p2[0]}
              y2={p2[1]}
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    </svg>
  );
};

export default PointTrail;
