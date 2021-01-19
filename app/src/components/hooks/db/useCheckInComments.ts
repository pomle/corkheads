import { firestore } from "firebase/app";
import { Moment } from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toMoment } from "types/convert";
import { useDB } from "../useDB";

export type Comment = {
  id: string;
  userId: string;
  timestamp?: Moment;
  body: string;
};

export function useCheckInComments(checkInId: string) {
  const db = useDB();

  const [comments, setComments] = useState<Comment[]>();

  const commentsRef = useMemo(() => {
    return db.collection("check-ins").doc(checkInId).collection("comments");
  }, [db, checkInId]);

  const addComment = useCallback(
    (userId: string, body: string) => {
      const comment = {
        timestamp: firestore.FieldValue.serverTimestamp(),
        userId,
        body,
      };
      return commentsRef.add(comment);
    },
    [commentsRef]
  );

  const deleteComment = useCallback(
    (commentId: string) => {
      return commentsRef.doc(commentId).delete();
    },
    [commentsRef]
  );

  useEffect(() => {
    return commentsRef.orderBy("timestamp", "desc").onSnapshot((snap) => {
      const comments = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
          body: data.body,
        };
      });
      setComments(comments);
    });
  }, [checkInId, commentsRef]);

  return {
    comments,
    addComment,
    deleteComment,
  };
}
