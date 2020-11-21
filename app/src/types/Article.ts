import { createConverter, RatingAggregate } from "./types";

export type Article = {
  id: string;
  displayName: string;
  manufacturer: string;
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
