import { createConverter } from "lib/firestore/converter";

export type UserCollectionEntry = {
  bottles?: {
    count: number;
  };
  bottled?: {
    year: number;
  };
  aged?: {
    years: number;
  };
};

export type UserArticle = {
  id: string;
  checkIns: number;
  owner: boolean;
  loveIt: boolean;
  tryIt?: boolean;
  rating?: number;
  collection: UserCollectionEntry;
};

const DEFAULTS: UserArticle = {
  id: "",
  checkIns: 0,
  owner: false,
  loveIt: false,
  collection: {},
};

export const converter = createConverter<UserArticle>({
  to(userArticle) {
    return userArticle;
  },

  from(snapshot) {
    return {
      ...DEFAULTS,
      ...snapshot.data({ serverTimestamps: "estimate" }),
    };
  },
});
