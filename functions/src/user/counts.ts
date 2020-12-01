import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { calculateActiveDiff } from "./diff";

admin.initializeApp();
const db = admin.firestore();

export const collectionSizeAggregate = functions.firestore
  .document("users/{userId}/collection/{articleId}")
  .onWrite(async (change, context) => {
    const { userId } = context.params;
    const userRef = db.collection("users").doc(userId);

    const diff = calculateActiveDiff(change);

    await db.runTransaction(async (transaction) => {
      const collectionSize = admin.firestore.FieldValue.increment(diff);
      transaction.update(userRef, {
        collectionSize,
      });
    });
  });

export const wishlistSizeAggregate = functions.firestore
  .document("users/{userId}/wishlist/{articleId}")
  .onWrite(async (change, context) => {
    const { userId } = context.params;
    const userRef = db.collection("users").doc(userId);

    const diff = calculateActiveDiff(change);

    await db.runTransaction(async (transaction) => {
      const wishlistSize = admin.firestore.FieldValue.increment(diff);
      transaction.update(userRef, {
        wishlistSize,
      });
    });
  });
