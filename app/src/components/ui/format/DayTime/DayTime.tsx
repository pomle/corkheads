import React from "react";
import { Moment } from "moment";

const FORMAT = "YYYY-MM-DD HH:mm";

interface DayTimeProps {
  date: Moment;
}

const DayTime: React.FC<DayTimeProps> = ({ date }) => {
  return <>{date.format(FORMAT)}</>;
};

export default DayTime;
