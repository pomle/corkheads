export type User = firebase.User;

type Container<T> = {
  id: string;
  data: T;
};

type ArticleData = {
  displayName: string;
  manufacturer: string;
  photoURL?: string;
};

export type Article = Container<ArticleData>;

type CheckInData = {
  userId: string;
  articleId: string;
  rating?: number;
  placeId?: string;
  comment?: string;
  position?: Position;
};

export type CheckIn = Container<CheckInData>;
