import { useMemo } from "react";
import { useDB } from "components/hooks/useDB";
import { converter as article } from "types/Article";
import { converter as checkIn } from "types/CheckIn";
import { converter as image } from "types/Image";
import { converter as user } from "types/User";
import { converter as userArticle } from "types/UserArticle";

export function useCollection() {
  const db = useDB();

  return useMemo(() => {
    return {
      article: db.collection("articles").withConverter(article),
      checkIn: db.collection("check-ins").withConverter(checkIn),
      image: db.collection("images").withConverter(image),
      user: db.collection("users").withConverter(user),
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
      userSearchHistory: userCollection.collection("search-history"),
      userFollowing: userCollection.collection("following"),
    };
  }, [db, userId]);
}
