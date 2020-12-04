import { useCallback } from "react";
import { firestore } from "firebase/app";
import { useDB } from "components/hooks/useDB";
import { User } from "types/User";
import { CheckIn } from "types/CheckIn";
import { useCollection } from "components/hooks/db/useCollection";
import { usePhotoUpload } from "components/hooks/usePhotoUpload";
import { UserArticle } from "types/UserArticle";
import { DocumentType } from "types/DocumentType";

type Payload = {
  user: User;
  checkIn: CheckIn;
  file?: File;
};

type CheckInObject = DocumentType<CheckIn>;
type UserArticleObject = DocumentType<UserArticle>;

export function useCommitCheckIn() {
  const db = useDB();
  const uploadFile = usePhotoUpload();

  const checkInsCollection = useCollection().checkIn;

  return useCallback(
    async ({ user, checkIn: checkInSource, file }: Payload) => {
      const articleId = checkInSource.articleId;
      const userId = user.uid;

      // Make a copy because it may be mutated in the photoURL assign.
      const checkIn: CheckInObject = { ...checkInSource };

      if (file) {
        checkIn.photoURL = await uploadFile(file);
      }

      const userArticle: Partial<UserArticleObject> = {
        checkIns: firestore.FieldValue.increment(1),
        rating: checkIn.rating,
      };

      const batch = db.batch();

      const checkInRef = checkInsCollection.doc();
      const checkInId = checkInRef.id;
      batch.set(checkInRef, checkIn);

      const userArticleRef = db
        .collection("users")
        .doc(userId)
        .collection("articles")
        .doc(articleId);

      batch.set(userArticleRef, userArticle, { merge: true });

      const userCheckInRef = db
        .collection("users")
        .doc(userId)
        .collection("check-ins")
        .doc(checkInId);

      batch.set(
        userCheckInRef,
        {
          active: true,
          addedTimestamp: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      await batch.commit();

      return checkInRef;
    },
    [checkInsCollection, db, uploadFile]
  );
}
