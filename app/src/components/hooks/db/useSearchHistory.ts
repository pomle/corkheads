import { firestore } from "firebase/app";
import { sha1 } from "lib/hash";
import { Moment } from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toMoment } from "types/convert";
import { useUserCollection } from "./useCollection";

type Query = {
  text: string;
};

export type SearchHistoryEntry = {
  id: string;
  query: Query;
  timestamp?: Moment;
};

export function useSearchHistory(userId: string) {
  const collection = useUserCollection(userId).userSearchHistory;

  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);

  const add = useCallback(
    (query: Query) => {
      const id = sha1(query.text);
      collection.doc(id).set({
        query,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    },
    [collection]
  );

  const remove = useCallback(
    (id: string) => {
      collection.doc(id).delete();
    },
    [collection]
  );

  useEffect(() => {
    return collection
      .orderBy("timestamp", "desc")
      .limit(10)
      .onSnapshot((snapshot) => {
        const entries = snapshot.docs.map((doc) => {
          const data = doc.data();

          const entry: SearchHistoryEntry = {
            id: doc.id,
            query: {
              text: data?.query?.text,
            },
            timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
          };

          return entry;
        });

        setHistory(entries);
      });
  }, [collection]);

  return useMemo(
    () => ({
      entries: history,
      add,
      remove,
    }),
    [history, add, remove]
  );
}
