import { Moment } from "moment";

type CommentNotification = {
  name: "comment";
  authorUserId: string;
  body: string;
};

type ReactionNotification = {
  name: "reaction";
  authorUserId: string;
  tags: string[];
};

export type Notification = {
  id: string;
  seen: boolean;
  timestamp?: Moment;
  type: CommentNotification | ReactionNotification;
};
