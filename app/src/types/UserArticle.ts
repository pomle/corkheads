import { createConverter } from "lib/firestore/converter";
import { Bottling } from "./Bottling";
import { Inventory } from "./Inventory";

export type UserArticle = {
  id: string;
  checkIns: number;
  owner: boolean;
  loveIt: boolean;
  tryIt?: boolean;
  rating?: number;
  bottling?: Bottling;
  inventory?: Inventory;
};

const DEFAULTS: UserArticle = {
  id: "",
  checkIns: 0,
  owner: false,
  loveIt: false,
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
