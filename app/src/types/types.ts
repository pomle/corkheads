type Geolocation = {
  lat: number;
  long: number;
};

export type User = firebase.User;

type Container<T> = {
  id: string;
  data: T;
};

type ArticleData = {
  displayName: string;
  manufacturer: string;
};

export type Article = Container<ArticleData>;

type CheckInData = {
  userId: string;
  articleId: string;
  rating?: number;
  placeId?: string;
  comment?: string;
  geolocation?: Geolocation;
};

export type CheckIn = Container<CheckInData>;
