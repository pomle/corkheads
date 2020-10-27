import { useState, useEffect, useMemo } from "react";
import moment, { Moment, DurationInputArg2 as Unit } from "moment";

export const useLiveTime = (unit: Unit): Moment => {
  const initial = useMemo(moment, []);

  const [time, setTime] = useState<Moment>(initial);

  useEffect(() => {
    const nextTime = time
      .clone()
      .startOf(unit)
      .add(1, unit);
    const delay = nextTime.diff(time, "milliseconds");
    const timer = setTimeout(setTime, delay, nextTime);
    return () => clearTimeout(timer);
  }, [unit, time, setTime]);

  return time;
};
