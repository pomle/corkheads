import { useMemo } from "react";
import { useDB } from "components/hooks/useDB";
import { converter as article } from "types/Article";
import { converter as checkIn } from "types/CheckIn";
import { converter as userArticle } from "types/UserArticle";

export function useCollection() {
  const db = useDB();

  return useMemo(() => {
    return {
      article: db.collection("articles").withConverter(article),
      checkIn: db.collection("check-ins").withConverter(checkIn),
    };
  }, [db]);
}

export function useUserCollection(userId: string) {
  const db = useDB();

  return useMemo(() => {
    const userCollection = db.collection("users").doc(userId);

    return {
      userArticle: userCollection
        .collection("articles")
        .withConverter(userArticle),
    };
  }, [db, userId]);
}