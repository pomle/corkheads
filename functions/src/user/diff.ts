import { Change } from "firebase-functions";
import * as admin from "firebase-admin";

type Snap = admin.firestore.DocumentSnapshot;

export function calculateActiveDiff<T extends Snap>(
  change: Change<T>,
  resolveFlag: (snap: T) => any
) {
  return +!!resolveFlag(change.after) - +!!resolveFlag(change.before);
}

export function calculateCollectionSizeDiff(change: Change<Snap>) {
  return calculateActiveDiff(change, (snap) => snap.data()?.collection?.active);
}

export function calculateWishlistSizeDiff(change: Change<Snap>) {
  return calculateActiveDiff(change, (snap) => snap.data()?.wishlist?.active);
}

export function calculateCheckInCountDiff(change: Change<Snap>) {
  return calculateActiveDiff(change, (snap) => snap.data()?.active);
}
