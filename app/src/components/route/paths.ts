import { createPath, createCodec } from "lib/path";

const stringCodec = createCodec(encodeURIComponent, decodeURIComponent);

const exploreArticles = createPath("/explore", {});

const articleView = createPath("/article/:articleId", {
  articleId: stringCodec,
});

const articleCheckIn = createPath("/article/:articleId/check-in", {
  articleId: stringCodec,
});

export { exploreArticles, articleView, articleCheckIn };
