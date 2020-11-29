import { Bottling } from "types/Bottling";
import { Inventory } from "types/Inventory";
import { UserArticle } from "types/UserArticle";

export type v2 = UserArticle;

export type v1 = {
  id: string;
  checkIns: number;
  owner: boolean;
  tryIt?: boolean;
  rating?: number;
  loveIt: boolean;
  bottling?: Bottling;
  inventory?: Inventory;
};
