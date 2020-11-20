import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createNewAggregate } from "./integrity";

admin.initializeApp();
const db = admin.firestore();

export const aggregateArticle = functions.firestore
  .document("users/{userId}/articles/{articleId}")
  .onWrite(async (change, context) => {
    const articleId = context.params.articleId;
    const articleRef = db.collection("articles").doc(articleId);

    await db.runTransaction(async (transaction) => {
      const articleDoc = await transaction.get(articleRef);

      const newRatingAggregate = createNewAggregate(
        change,
        articleDoc,
      )

      transaction.update(articleRef, {
        ratingAggregate: newRatingAggregate
      });
    });
  });
