type Geolocation = {
  lat: number;
  long: number;
};

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
  placeId?: string;
  rating: number;
  geolocation: Geolocation;
  comment: string;
};

export type CheckIn = Container<CheckInData>;
