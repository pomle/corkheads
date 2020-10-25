import React from "react";
import { Moment } from "moment";

const FORMAT = "HH:mm";

interface TimeProps {
  date: Moment;
}

const Time: React.FC<TimeProps> = ({ date }) => {
  if (!date.isValid()) {
    return <>--:--</>;
  }

  return <>{date.format(FORMAT)}</>;
};

export default Time;
