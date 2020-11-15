import { useCallback } from "react";
import moment from "moment";
import * as firebase from "firebase/app";
import { useCheckInCollection } from "components/hooks/db/useCheckIns";
import { useDB } from "components/hooks/useDB";
import { User } from "types/user";
import { CheckIn } from "types/checkIn";

export function useCommitCheckIn(user: User) {
  const db = useDB();
  const checkInsRef = useCheckInCollection();
  const userRef = db.collection("users").doc(user.uid);
  const userCheckInsRef = userRef.collection("check-ins");
  const userArticlesRef = userRef.collection("articles");

  return useCallback(
    (checkIn: CheckIn) => {
      return checkInsRef.add(checkIn).then((result) => {
        const userCheckInRef = userCheckInsRef.doc(result.id);
        const userArticleRef = userArticlesRef.doc(checkIn.data.articleId);

        const batch = db.batch();

        batch.set(userCheckInRef, {
          createdAt: moment().toISOString(),
        });

        batch.set(
          userArticleRef,
          {
            checkIns: firebase.firestore.FieldValue.increment(1),
          },
          { merge: true }
        );

        return batch.commit();
      });
    },
    [db, checkInsRef, userCheckInsRef, userArticlesRef]
  );
}
