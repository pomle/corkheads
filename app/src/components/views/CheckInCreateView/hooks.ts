import { useCallback } from "react";
import moment from "moment";
import * as firebase from "firebase/app";
import { useDB } from "components/hooks/useDB";
import { User } from "types/User";
import { CheckIn } from "types/CheckIn";
import { useUserUpload } from "components/hooks/useUserUpload";
import { useCollection } from "components/hooks/db/useCollection";

type Payload = {
  user: User;
  checkIn: CheckIn;
  file?: File;
};

export function useCommitCheckIn() {
  const db = useDB();
  const uploadFile = useUserUpload();

  const checkInsCollection = useCollection().checkIn;

  return useCallback(
    async ({ user, checkIn: checkInSource, file }: Payload) => {
      // Make a deep copy because it may be mutated in the photoURL assign.
      const checkIn = { ...checkInSource };

      const uploadResult = await (file && uploadFile(user, file));

      const photoURL = await (uploadResult &&
        (uploadResult.ref.getDownloadURL() as Promise<string>));

      if (photoURL) {
        checkIn.photoURL = photoURL;
      }

      const checkInResult = await checkInsCollection.add(checkIn);

      const userRef = db.collection("users").doc(user.uid);
      const userCheckInsRef = userRef.collection("check-ins");
      const userArticlesRef = userRef.collection("articles");
      const userCheckInRef = userCheckInsRef.doc(checkInResult.id);
      const userArticleRef = userArticlesRef.doc(checkIn.articleId);

      const batch = db.batch();

      batch.set(userCheckInRef, {
        createdAt: moment().toISOString(),
      });

      batch.set(
        userArticleRef,
        {
          checkIns: firebase.firestore.FieldValue.increment(1),
          rating: checkIn.rating || firebase.firestore.FieldValue.delete(),
          loveIt: !!checkIn.loveIt,
        },
        { merge: true }
      );

      return batch.commit();
    },
    [checkInsCollection, db, uploadFile]
  );
}
