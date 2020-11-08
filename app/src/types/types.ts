type Container<T> = {
  id: string;
  data: T;
};

type ArticleData = {
  displayName: string;
  manufacturer: string;
};

export type Article = Container<ArticleData>;
