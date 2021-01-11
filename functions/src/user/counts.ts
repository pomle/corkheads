import * as functions from "firebase-functions";
import { admin } from "../admin";
import {
  calculateCollectionSizeDiff,
  calculateWishlistSizeDiff,
  calculateCheckInCountDiff,
  calculateContributionSizeDiff,
} from "./diff";

const db = admin.firestore();
const increment = admin.firestore.FieldValue.increment;

export const articleSizeAggregate = functions.firestore
  .document("users/{userId}/articles/{articleId}")
  .onWrite(async (change, context) => {
    const { userId } = context.params;
    const userRef = db.collection("users").doc(userId);

    const collectionDiff = calculateCollectionSizeDiff(change);
    const wishlistDiff = calculateWishlistSizeDiff(change);

    await db.runTransaction(async (transaction) => {
      transaction.update(userRef, {
        collectionSize: increment(collectionDiff),
        wishlistSize: increment(wishlistDiff),
      });
    });
  });

export const checkInCountAggregate = functions.firestore
  .document("users/{userId}/check-ins/{checkInId}")
  .onWrite(async (change, context) => {
    const { userId } = context.params;
    const userRef = db.collection("users").doc(userId);

    const diff = calculateCheckInCountDiff(change);

    await db.runTransaction(async (transaction) => {
      transaction.update(userRef, {
        checkInCount: increment(diff),
      });
    });
  });

export const articleContibutionSizeAggregate = functions.firestore
  .document("articles/{articleId}")
  .onWrite(async (change, context) => {
    const userId = change.after.data()?.userId || change.before.data()?.userId;
    const userRef = db.collection("users").doc(userId);

    const sizeDiff = calculateContributionSizeDiff(change);

    await db.runTransaction(async (transaction) => {
      transaction.update(userRef, {
        articleContributionsSize: increment(sizeDiff),
      });
    });
  });
