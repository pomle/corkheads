import * as functions from "firebase-functions";
import { admin } from "../admin";

const db = admin.firestore();

export const createCheckInReactionNotification = functions.firestore
  .document("check-ins/{checkInId}/reactions/{authorUserId}")
  .onCreate(async (snap, context) => {
    const { authorUserId, checkInId } = context.params;

    const { tags, timestamp } = snap.data();

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
        name: "reaction",
        authorUserId,
        checkInId,
        tags,
      },
    });
  });
