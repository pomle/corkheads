import { createConverter } from "lib/firestore/converter";
import { RatingAggregate } from "./RatingAggregate";
import { Bottling } from "./Bottling";
import { upgrade } from "./versioning/Article/upgrade";

export type Article = {
  id: string;
  displayName?: string;
  bottling?: Partial<Bottling>;
  photoURL?: string;
  imageId?: string;
  ratingAggregate?: RatingAggregate;
};

export function createArticle(id: string): Article {
  return {
    id,
  };
}

export const DEFAULTS = createArticle("corkheads-article");

export const converter = createConverter<Article>({
  to(article) {
    return article;
  },

  from(snapshot) {
    return upgrade({
      ...DEFAULTS,
      ...snapshot.data({ serverTimestamps: "estimate" }),
    });
  },
});
