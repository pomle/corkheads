import { Article } from "./types";

type Snapshot = firebase.firestore.QueryDocumentSnapshot;

const DEFAULT_ARTICLE = {
    displayName: "",
};

export const articleConverter = {
    toFirestore(article: Article) {
        return article.data;
    },

    fromFirestore(snapshot: Snapshot) {
        return {
            id: snapshot.id,
            data: { ...DEFAULT_ARTICLE, ...snapshot.data() }
        }
    }
}
