import { firestore } from "firebase/app";
import { createConverter } from "lib/firestore/converter";
import { upgrade } from "./versioning/UserArticle/upgrade";
import { Bottling } from "./Bottling";
import { Rating } from "./Rating";
import { Inventory } from "./Inventory";
import { Moment } from "moment";

export type UserArticle = {
  id: string;
  displayName?: string;
  checkIns: number;
  photoURL?: string;
  rating?: Rating;
  bottling?: Partial<Bottling>;
  collection?: {
    active: boolean;
    addedTimestamp?: Moment;
  };
  inventory?: Inventory;
  wishlist?: {
    active: boolean;
    addedTimestamp?: Moment;
  };
};

export function createUserArticle(id: string): UserArticle {
  return {
    id,
    checkIns: 0,
  };
}

export const DEFAULTS = createUserArticle("corkheads-userarticle");

export const converter = createConverter<UserArticle>({
  to(userArticle) {
    function collection(collection: any) {
      const active = collection.active;

      const output: any = {
        ...collection,
      };

      if (active) {
        output.addedTimestamp = firestore.FieldValue.serverTimestamp();
      } else {
        delete output.addedTimestamp;
      }

      return output;
    }

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

    const output = {
      ...userArticle,
    };

    if (output.collection) {
      output.collection = collection(output.collection);
    }

    if (output.wishlist) {
      output.wishlist = wishlist(output.wishlist);
    }

    return output;
  },

  from(snapshot) {
    return upgrade({
      ...DEFAULTS,
      ...snapshot.data({ serverTimestamps: "estimate" }),
    });
  },
});
