import { useState, useEffect, useMemo } from "react";
import moment, { Moment, DurationInputArg2 as Unit } from "moment";

export const useLiveTime = (unit: Unit): Moment => {
  const initial = useMemo(moment, []);

  const [time, setTime] = useState<Moment>(initial);

  useEffect(() => {
    const delay = time
      .clone()
      .startOf(unit)
      .add(1, unit)
      .diff(time, "milliseconds");

    const timer = setTimeout(() => {
      const nextTime = moment().startOf(unit).add(1, unit);
      setTime(nextTime);
    }, delay);

    return () => clearTimeout(timer);
  }, [unit, time, setTime]);

  return time;
};
