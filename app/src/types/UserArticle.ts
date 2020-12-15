import { createConverter } from "lib/firestore/converter";
import { upgrade } from "./versioning/UserArticle/upgrade";
import { Bottling } from "./Bottling";
import { Rating } from "./Rating";

export type UserArticle = {
  id: string;
  checkIns: number;
  owner: boolean;
  rating?: Rating;
  bottling?: Partial<Bottling>;
};

export function createUserArticle(id: string): UserArticle {
  return {
    id,
    checkIns: 0,
    owner: false,
  };
}

export const DEFAULTS = createUserArticle("corkheads-userarticle");

export const converter = createConverter<UserArticle>({
  to(userArticle) {
    return userArticle;
  },

  from(snapshot) {
    return upgrade({
      ...DEFAULTS,
      ...snapshot.data({ serverTimestamps: "estimate" }),
    });
  },
});
