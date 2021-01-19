import * as firebase from "firebase/app";
import { Moment } from "moment";
import { createConverter } from "lib/firestore/converter";
import { upgrade } from "./versioning/CheckIn/upgrade";
import { toMoment } from "./convert";
import { Rating } from "./Rating";

export type CheckIn = {
  id: string;
  userId: string;
  articleId: string;
  imageId?: string;
  timestamp?: Moment;
  rating: Rating;
  placeId?: string;
  comment?: string;
  position?: Position;
  photoURL?: string;
  commentCount: number;
  reactionCount: number;
};

export function createCheckIn(id: string): CheckIn {
  return {
    id,
    userId: "",
    articleId: "",
    rating: {
      love: false,
    },
    commentCount: 0,
    reactionCount: 0,
  };
}

const DEFAULTS = createCheckIn("corkheads-checkin");

export const converter = createConverter<CheckIn>({
  to(checkIn) {
    return {
      ...checkIn,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },

  from(snapshot) {
    const data = snapshot.data();
    return upgrade({
      ...DEFAULTS,
      ...data,
      timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
    });
  },
});
