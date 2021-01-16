import { Moment } from "moment";

export type ReactionTag = "like" | "love" | "cheers" | "drunk" | "rich";

export type Reaction = {
  timestamp?: Moment;
  tags: ReactionTag[];
};
