import * as firebase from "firebase/app";
import { Moment } from "moment";
import { createConverter } from "lib/firestore/converter";
import { RatingAggregate } from "./RatingAggregate";
import { Bottling } from "./Bottling";
import { upgrade } from "./versioning/Article/upgrade";
import { toMoment } from "./convert";

export type Article = {
  id: string;
  displayName?: string;
  bottling?: Partial<Bottling>;
  photoURL?: string;
  imageId?: string;
  ratingAggregate?: RatingAggregate;
  userId?: string;
  timestamp?: Moment;
};

export function createArticle(id: string): Article {
  return {
    id,
  };
}

export const DEFAULTS = createArticle("corkheads-article");

export const converter = createConverter<Article>({
  to(article) {
    return {
      ...article,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },

  from(snapshot) {
    const data = snapshot.data();
    return upgrade({
      ...DEFAULTS,
      ...snapshot.data({ serverTimestamps: "estimate" }),
      timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
    });
  },
});
