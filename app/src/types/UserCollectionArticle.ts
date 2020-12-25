import { firestore } from "firebase/app";
import moment, { Moment } from "moment";
import { createConverter } from "lib/firestore/converter";
import { toMoment } from "./convert";

export type UserCollectionArticle = {
  id: string;
  active: boolean;
  addedTimestamp: Moment;
};

const DEFAULTS: UserCollectionArticle = {
  id: "",
  active: false,
  addedTimestamp: moment.invalid(),
};

export const converter = createConverter<UserCollectionArticle>({
  to(userCollectionArticle) {
    const active = userCollectionArticle.active;

    const data: any = {
      ...userCollectionArticle,
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
