import { localize, Locale as LC } from "lib/i18n/localization";

export const JustNow = localize({
  [LC.enGB]: "A moment ago",
  [LC.svSE]: "Nyss",
});

export const DaysAgo = localize<{ days: number }>({
  [LC.enGB]: ({ days }) => {
    if (days === 1) {
      return "1 day ago";
    }
    return `${days} days ago`;
  },
  [LC.svSE]: ({ days }) => {
    if (days === 1) {
      return "1 dag sedan";
    }
    return `${days} dagar sedan`;
  },
});

export const HoursAgo = localize<{ hours: number }>({
  [LC.enGB]: ({ hours }) => {
    if (hours === 1) {
      return "1 hour ago";
    }
    return `${hours} hours ago`;
  },
  [LC.svSE]: ({ hours }) => {
    if (hours === 1) {
      return "1 timme sedan";
    }
    return `${hours} timmar sedan`;
  },
});

export const MinutesAgo = localize<{ minutes: number }>({
  [LC.enGB]: ({ minutes }) => {
    if (minutes === 1) {
      return "1 minute ago";
    }
    return `${minutes} minutes ago`;
  },
  [LC.svSE]: ({ minutes }) => {
    if (minutes === 1) {
      return "1 minut sedan";
    }
    return `${minutes} minuter sedan`;
  },
});
