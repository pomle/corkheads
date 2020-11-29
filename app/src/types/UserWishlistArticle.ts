import { firestore } from "firebase";
import moment, { Moment } from "moment";
import { createConverter } from "lib/firestore/converter";
import { toMoment } from "./convert";

export type UserWishlistArticle = {
  id: string;
  active: boolean;
  addedTimestamp: Moment;
};

const DEFAULTS: UserWishlistArticle = {
  id: "",
  active: false,
  addedTimestamp: moment.invalid(),
};

export const converter = createConverter<UserWishlistArticle>({
  to(userWishlistArticle) {
    const active = userWishlistArticle.active;

    const data: any = {
      ...userWishlistArticle,
    };

    if (active) {
      data.addedTimestamp = firestore.FieldValue.serverTimestamp();
    } else {
      delete data.addedTimestamp;
    }

    return data;
  },

  from(snapshot) {
    const data = snapshot.data({ serverTimestamps: "estimate" });
    return {
      ...DEFAULTS,
      ...data,
      addedTimestamp: toMoment(data.addedTimestamp),
    };
  },
});
