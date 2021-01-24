import * as functions from "firebase-functions";
import { admin } from "../admin";

const db = admin.firestore();

export const createCheckInCommentNotification = functions.firestore
  .document("check-ins/{checkInId}/comments/{commentId}")
  .onCreate(async (snap, context) => {
    const { checkInId } = context.params;

    const { userId: authorUserId, body, timestamp } = snap.data();

    const checkIn = await db.collection("check-ins").doc(checkInId).get();

    if (!checkIn.exists) {
      console.log("Check in id: %s does not exist", checkInId);
    }

    const recipientUserId = checkIn.data()?.userId;

    if (!recipientUserId) {
      console.log("Recipient user id could not be extracted", checkInId);
      return;
    }

    if (recipientUserId === authorUserId) {
      console.log("Recipient and author same");
      return;
    }

    const notificationsRef = db
      .collection("users")
      .doc(recipientUserId)
      .collection("notifications");

    await notificationsRef.add({
      seen: false,
      timestamp,
      type: {
        name: "comment",
        authorUserId,
        checkInId,
        body,
      },
    });
  });
