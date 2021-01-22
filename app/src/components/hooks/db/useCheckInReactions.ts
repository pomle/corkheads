import { useEffect, useMemo, useState } from "react";
import { toMoment } from "types/convert";
import { Reaction } from "types/Reaction";
import { useDB } from "../useDB";

export function useCheckInReactions(checkInId: string) {
  const db = useDB();

  const [reactions, setReactions] = useState<Reaction[]>();

  const reactionsRef = useMemo(() => {
    return db.collection("check-ins").doc(checkInId).collection("reactions");
  }, [db, checkInId]);

  useEffect(() => {
    return reactionsRef.onSnapshot((snap) => {
      const reactions = snap.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
        } as Reaction;
      });
      setReactions(reactions);
    });
  }, [reactionsRef]);

  return {
    reactions,
  };
}
