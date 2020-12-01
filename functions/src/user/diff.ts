import { Change } from "firebase-functions";
import * as admin from "firebase-admin";

export function calculateActiveDiff(
  change: Change<admin.firestore.DocumentSnapshot>
) {
  return +!!change.after.data()?.active - +!!change.before.data()?.active;
}
