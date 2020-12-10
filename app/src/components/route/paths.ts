import { createPath } from "lib/path";
import { stringCodec } from "./codecs";

const rootView = createPath("/", {});
const profileView = rootView;

const exploreArticles = createPath("/explore", {});

const articleCreate = createPath("/article/create", {});

const articleView = createPath("/article/view/:articleId", {
  articleId: stringCodec,
});
const articlePicture = articleView.append("/picture", {});

const articleCheckIn = articleView.append("/check-in", {});

const checkInView = createPath("/checkIn/view/:checkInId", {
  checkInId: stringCodec,
});
const checkInPicture = checkInView.append("/picture", {});

export {
  rootView,
  profileView,
  exploreArticles,
  articleCreate,
  articleView,
  articlePicture,
  articleCheckIn,
  checkInView,
  checkInPicture,
};
