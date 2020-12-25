import { firestore } from "firebase/app";
import { createConverter } from "lib/firestore/converter";
import { upgrade } from "./versioning/UserArticle/upgrade";
import { Bottling } from "./Bottling";
import { Rating } from "./Rating";
import { Moment } from "moment";

export type UserArticle = {
  id: string;
  displayName?: string;
  checkIns: number;
  owner: boolean;
  photoURL?: string;
  rating?: Rating;
  bottling?: Partial<Bottling>;
  wishlist?: {
    active: boolean;
    addedTimestamp?: Moment;
  };
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
    function wishlist(wishlist: any) {
      const active = wishlist.active;

      const output: any = {
        ...wishlist,
      };

      if (active) {
        output.addedTimestamp = firestore.FieldValue.serverTimestamp();
      } else {
        delete output.addedTimestamp;
      }

      return output;
    }

    return {
      ...userArticle,
      wishlist: wishlist(userArticle.wishlist),
    };
  },

  from(snapshot) {
    return upgrade({
      ...DEFAULTS,
      ...snapshot.data({ serverTimestamps: "estimate" }),
    });
  },
});
