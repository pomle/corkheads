import * as firebase from "firebase/app";
import { Moment } from "moment";
import { toMoment } from "./convert";
import { Container, Converter } from "./types";

type CheckInData = {
  userId: string;
  articleId: string;
  timestamp?: Moment;
  rating?: number;
  placeId?: string;
  comment?: string;
  position?: Position;
};

export type CheckIn = Container<CheckInData>;

const DEFAULT_CHECKIN = {
  userId: "",
  articleId: "",
};

export const converter: Converter<CheckInData> = {
  toFirestore(checkIn) {
    const data = checkIn.data;
    return {
      ...data,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },

  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      data: {
        ...DEFAULT_CHECKIN,
        ...data,
        timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
      },
    };
  },
};
