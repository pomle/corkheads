import React from "react";
import { Moment } from "moment";

const FORMAT = "YYYY-MM-DD";

interface DayProps {
  date: Moment;
}

const Day: React.FC<DayProps> = ({ date }) => {
  return <>{date.format(FORMAT)}</>;
};

export default Day;
