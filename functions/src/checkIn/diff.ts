import { Change } from "firebase-functions";
import * as admin from "firebase-admin";

type Snap = admin.firestore.DocumentSnapshot;

export function calculateActiveDiff<T extends Snap>(
  change: Change<T>,
  resolveFlag: (snap: T) => any
) {
  return +!!resolveFlag(change.after) - +!!resolveFlag(change.before);
}

export function calculateReactionSizeDiff(change: Change<Snap>) {
  return calculateActiveDiff(change, (snap) => snap.exists);
}

export function calculateCommentCountDiff(change: Change<Snap>) {
  return calculateActiveDiff(change, (snap) => snap.exists);
}
