import { createConverter } from "lib/firestore/converter";
import { RatingAggregate } from "./RatingAggregate";
import { Bottling } from "./Bottling";

export type Article = {
  id: string;
  displayName: string;
  manufacturer: string;
  bottling?: Bottling;
  photoURL?: string;
  ratingAggregate?: RatingAggregate;
};

const DEFAULTS: Article = {
  id: "",
  displayName: "",
  manufacturer: "",
};

export const converter = createConverter<Article>({
  to(article) {
    return article;
  },

  from(snapshot) {
    return {
      ...DEFAULTS,
      ...snapshot.data({ serverTimestamps: "estimate" }),
    };
  },
});
