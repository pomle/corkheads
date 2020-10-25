import React from "react";
import { Moment } from "moment";

interface DurationProps {
  from: Moment;
  until: Moment;
}

const UNITS: [number, string][] = [
  [60 * 60, "h"],
  [60, "min"]
];

const Duration: React.FC<DurationProps> = ({ from, until }) => {
  const parts: string[] = [];
  let rest = until.diff(from, "seconds");
  for (const [seconds, suffix] of UNITS) {
    const value = Math.floor(rest / seconds);
    rest -= value * seconds;
    if (value > 0) {
      parts.push(value + suffix);
    }
  }
  return <>{parts.join(" ")}</>;
};

export default Duration;
