import * as functions from "firebase-functions";
import { admin } from "../admin";
import { calculateReactionSizeDiff } from "./diff";

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment;

export const checkInReactionCountAggregate = functions.firestore
  .document("check-ins/{checkInId}/reactions/{userId}")
  .onWrite(async (change, context) => {
    const { checkInId } = context.params;

    const checkInRef = db.collection("check-ins").doc(checkInId);

    const diff = calculateReactionSizeDiff(change);

    await db.runTransaction(async (transaction) => {
      transaction.update(checkInRef, {
        reactionCount: increment(diff),
      });
    });
  });
