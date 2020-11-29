import { Moment } from "moment";
import { CheckIn } from "types/CheckIn";

export type v2 = CheckIn;

export type v1 = {
  id: string;
  userId: string;
  articleId: string;
  timestamp?: Moment;
  rating?: number;
  loveIt: boolean;
  placeId?: string;
  comment?: string;
  position?: Position;
  photoURL?: string;
};
