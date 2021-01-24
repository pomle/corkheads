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
    if (months === 1) {
      return "1 månad";
    }
    return `${months} månader`;
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
    if (hours === 1) {
      return "1 hour";
    }
    return `${hours} h`;
  },
  [LC.svSE]: ({ hours }) => {
    if (hours === 1) {
      return "1 timme";
    }
    return `${hours} tim`;
  },
});

export const MinutesAgo = localize<{ minutes: number }>({
  [LC.enGB]: ({ minutes }) => {
    if (minutes === 1) {
      return "1 minute";
    }
    return `${minutes} m`;
  },
  [LC.svSE]: ({ minutes }) => {
    if (minutes === 1) {
      return "1 minut";
    }
    return `${minutes} m`;
  },
});
