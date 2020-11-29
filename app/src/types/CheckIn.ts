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
  timestamp?: Moment;
  rating: Rating;
  placeId?: string;
  comment?: string;
  position?: Position;
  photoURL?: string;
};

const DEFAULTS = {
  id: "",
  userId: "",
  articleId: "",
  rating: {
    love: false,
  },
};

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
