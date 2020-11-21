import * as firebase from "firebase/app";
import { Moment } from "moment";
import { toMoment } from "./convert";
import { createConverter } from "./types";

export type CheckIn = {
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

const DEFAULTS = {
  id: "",
  userId: "",
  articleId: "",
  loveIt: false,
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
    return {
      ...DEFAULTS,
      ...data,
      timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
    };
  },
});
