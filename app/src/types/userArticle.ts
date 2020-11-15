import { Container, Converter } from "./types";

type UserArticleData = {
  checkIns: number;
  owner: boolean;
};

export type UserArticle = Container<UserArticleData>;

const DEFAULTS: UserArticleData = {
  checkIns: 0,
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