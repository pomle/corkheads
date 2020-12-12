import { createConverter } from "lib/firestore/converter";
import { RatingAggregate } from "./RatingAggregate";
import { Bottling } from "./Bottling";
import { upgrade } from "./versioning/Article/upgrade";
import { ImageRef } from "./ImageRef";

export type Article = {
  id: string;
  displayName: string;
  bottling?: Partial<Bottling>;
  photoURL?: string;
  imageRef?: ImageRef;
  ratingAggregate?: RatingAggregate;
};

export const DEFAULTS: Article = {
  id: "",
  displayName: "",
};

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
