import React from "react";
import { Moment } from "moment";
import { useLiveTime } from "components/hooks/useLiveTime";
import DayTime from "components/ui/format//DayTime";
import * as Trans from "./locales";

interface PassedTimeProps {
  date: Moment;
}

const PassedTime: React.FC<PassedTimeProps> = ({ date }) => {
  const now = useLiveTime("minute");

  const days = now.diff(date, "days");
  if (days > 30) {
    return <DayTime date={date} />;
  } else if (days > 0) {
    return <Trans.DaysAgo days={days} />;
  }

  const hours = now.diff(date, "hours");
  if (hours > 0) {
    return <Trans.HoursAgo hours={hours} />;
  }

  const minutes = now.diff(date, "minute");
  if (minutes > 1) {
    return <Trans.MinutesAgo minutes={minutes} />;
  }

  return <Trans.JustNow />;
};

export default PassedTime;
