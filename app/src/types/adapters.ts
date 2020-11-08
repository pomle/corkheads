import { Article } from "./types";

type Snapshot = firebase.firestore.QueryDocumentSnapshot;

const DEFAULT_ARTICLE = {
  displayName: "",
  manufacturer: "",
};

export const articleConverter = {
  toFirestore(article: Article) {
    return article.data;
  },

  fromFirestore(snapshot: Snapshot): Article {
    return {
      id: snapshot.id,
      data: { ...DEFAULT_ARTICLE, ...snapshot.data() },
    };
  },
};
