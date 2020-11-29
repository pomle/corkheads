import moment, { Moment } from "moment";
import * as firebase from "firebase/app";

export function toMoment(timestamp: firebase.firestore.Timestamp) {
  try {
    return moment(timestamp.toDate());
  } catch (error) {
    console.error("Invalid timestamp", timestamp);
    return moment.invalid();
  }
}

export function toTimestamp(moment: Moment) {
  return firebase.firestore.Timestamp.fromDate(moment.toDate());
}
