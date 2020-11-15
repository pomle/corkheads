import React from "react";
import { Moment } from "moment";
import { useLiveTime } from "components/hooks/useLiveTime";
import Day from "components/ui/format/Day";
import Time from "components/ui/format/Time";
import * as Trans from "./locales";

interface PassedTimeProps {
  date: Moment;
}

const PassedTime: React.FC<PassedTimeProps> = ({ date }) => {
  const now = useLiveTime("minute");

  const hours = now.diff(date, "hours");
  if (hours < 1) {
    const minutes = now.diff(date, "minute");
    if (minutes < 1) {
      return <Trans.JustNow />;
    }
    return <Trans.MinutesAgo minutes={minutes} />;
  } else if (hours < 6) {
    return <Trans.HoursAgo hours={hours} />;
  } else if (hours < 12) {
    return <Time date={date} />;
  } else {
    return <Day date={date} />;
  }
};

export default PassedTime;
