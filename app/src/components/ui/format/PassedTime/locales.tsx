import { localize, Locale as LC } from "lib/i18n/localization";

export const JustNow = localize({
  [LC.enGB]: "Right now",
  [LC.svSE]: "Nyss",
});

export const YearsAgo = localize<{ years: number }>({
  [LC.enGB]: ({ years }) => {
    if (years === 1) {
      return "1 year";
    }
    return `${years} years`;
  },
  [LC.svSE]: ({ years }) => {
    return `${years} år`;
  },
});

export const MonthsAgo = localize<{ months: number }>({
  [LC.enGB]: ({ months }) => {
    if (months === 1) {
      return "1 month";
    }
    return `${months} months`;
  },
  [LC.svSE]: ({ months }) => {
    return `${months} mån`;
  },
});

export const DaysAgo = localize<{ days: number }>({
  [LC.enGB]: ({ days }) => {
    if (days === 1) {
      return "1 day";
    }
    return `${days} days`;
  },
  [LC.svSE]: ({ days }) => {
    if (days === 1) {
      return "1 dag";
    }
    return `${days} dagar`;
  },
});

export const HoursAgo = localize<{ hours: number }>({
  [LC.enGB]: ({ hours }) => {
    return `${hours}h`;
  },
  [LC.svSE]: ({ hours }) => {
    return `${hours}t`;
  },
});

export const MinutesAgo = localize<{ minutes: number }>({
  [LC.enGB]: ({ minutes }) => {
    return `${minutes}m`;
  },
  [LC.svSE]: ({ minutes }) => {
    return `${minutes}m`;
  },
});
