import { createPath, createCodec } from "lib/path";

const stringCodec = createCodec(encodeURIComponent, decodeURIComponent);

const profileView = createPath("/", {});

const exploreArticles = createPath("/explore", {});

const articleCreate = createPath("/article/new", {});

const articleView = createPath("/article/:articleId", {
  articleId: stringCodec,
});

const articleCheckIn = createPath("/article/:articleId/check-in", {
  articleId: stringCodec,
});

export {
  profileView,
  exploreArticles,
  articleCreate,
  articleView,
  articleCheckIn,
};
