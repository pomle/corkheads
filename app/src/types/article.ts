import { Container, Converter, RatingAggregate } from "./types";

type ArticleData = {
  displayName: string;
  manufacturer: string;
  photoURL?: string;
  ratingAggregate?: RatingAggregate;
};

export type Article = Container<ArticleData>;

const DEFAULT_ARTICLE: ArticleData = {
  displayName: "",
  manufacturer: "",
};

export const converter: Converter<ArticleData> = {
  toFirestore(article) {
    return article.data;
  },

  fromFirestore(snapshot) {
    return {
      id: snapshot.id,
      data: { ...DEFAULT_ARTICLE, ...snapshot.data() },
    };
  },
};
