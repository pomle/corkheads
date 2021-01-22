import { Moment } from "moment";

export type Comment = {
  id: string;
  userId: string;
  timestamp?: Moment;
  body: string;
};
