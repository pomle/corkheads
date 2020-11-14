import { Container, Converter } from "./types";

type CheckInData = {
  userId: string;
  articleId: string;
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
    return checkIn.data;
  },

  fromFirestore(snapshot) {
    return {
      id: snapshot.id,
      data: { ...DEFAULT_CHECKIN, ...snapshot.data() },
    };
  },
};
