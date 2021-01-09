import { firestore } from "firebase/app";
import { Moment } from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toMoment } from "types/convert";
import { useDB } from "../useDB";

type ReactionTag = "like" | "love" | "cheers";

type Reaction = {
  timestamp?: Moment;
  tags: ReactionTag[];
};

export function useCheckInReaction(checkInId: string, userId: string) {
  const db = useDB();

  const [reaction, setReaction] = useState<Reaction>();

  const reactionsRef = useMemo(() => {
    return db.collection("check-ins").doc(checkInId).collection("reactions");
  }, [db, checkInId]);

  const userReactionRef = useMemo(() => reactionsRef.doc(userId), [
    reactionsRef,
    userId,
  ]);

  const putReaction = useCallback(
    (reaction: Reaction) => {
      return userReactionRef.set({
        ...reaction,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    },
    [userReactionRef]
  );

  const dropReaction = useCallback(() => {
    return userReactionRef.delete();
  }, [userReactionRef]);

  useEffect(() => {
    return userReactionRef.onSnapshot((snap) => {
      const data = snap.data();

      if (data) {
        setReaction({
          ...data,
          timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
        } as Reaction);
      } else {
        setReaction(undefined);
      }
    });
  }, [userReactionRef]);

  return {
    reaction,
    putReaction,
    dropReaction,
  };
}
