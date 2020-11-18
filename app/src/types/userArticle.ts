import { Container, Converter } from "./types";

type UserArticleData = {
  checkIns: number;
  owner: boolean;
  rating?: number;
};

export type UserArticle = Container<UserArticleData>;

const DEFAULTS: UserArticleData = {
  checkIns: 0,
  rating: 1,
  owner: false,
};

export const converter: Converter<UserArticleData> = {
  toFirestore(object) {
    return object.data;
  },

  fromFirestore(snapshot) {
    return {
      id: snapshot.id,
      data: { ...DEFAULTS, ...snapshot.data() },
    };
  },
};
