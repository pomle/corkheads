import { createPath } from "lib/path";
import { stringCodec } from "./codecs";

const profileView = createPath("/", {});
const settingsView = createPath("/settings", {});
const toplistView = createPath("/toplist", {});
const collectionView = createPath("/collection", {});
const checkInsView = createPath("/checkIns", {});
const wishlistView = createPath("/wishlist", {});

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
  profileView,
  settingsView,
  toplistView,
  collectionView,
  checkInsView,
  wishlistView,
  exploreArticles,
  articleCreate,
  articleView,
  articlePicture,
  articleCheckIn,
  checkInView,
  checkInPicture,
};
