import React from "react";
import { Moment } from "moment";
import Time from "../Time";

interface TimespanProps {
  start: Moment;
  end: Moment;
}

const Timespan: React.FC<TimespanProps> = ({ start, end }) => {
  return (
    <>
      <Time date={start} /> - <Time date={end} />
    </>
  );
};

export default Timespan;
