import { createPath, createCodec } from "lib/path";

const stringCodec = createCodec(encodeURIComponent, decodeURIComponent);

const profileView = createPath("/", {});

const exploreArticles = createPath("/explore", {});

const articleCreate = createPath("/article/create", {});

const articleView = createPath("/article/view/:articleId", {
  articleId: stringCodec,
});

const articleCheckIn = articleView.append("/check-in", {});

export {
  profileView,
  exploreArticles,
  articleCreate,
  articleView,
  articleCheckIn,
};
