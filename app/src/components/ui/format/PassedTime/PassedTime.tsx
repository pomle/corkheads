import React from "react";
import { Moment } from "moment";
import { useLiveTime } from "components/hooks/useLiveTime";
import * as Trans from "./locales";

interface PassedTimeProps {
  date: Moment;
}

const PassedTime: React.FC<PassedTimeProps> = ({ date }) => {
  const now = useLiveTime("minute");

  const years = now.diff(date, "years");
  if (years > 0) {
    return <Trans.YearsAgo years={years} />;
  }

  const months = now.diff(date, "months");
  if (months > 0) {
    return <Trans.MonthsAgo months={months} />;
  }

  const days = now.diff(date, "days");
  if (days > 0) {
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
