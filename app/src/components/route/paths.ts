import { createPath, createCodec } from "lib/path";

const stringCodec = createCodec(encodeURIComponent, decodeURIComponent);

const profileView = createPath("/", {});
const collectionView = createPath("/collection", {});
const checkInsView = createPath("/checkIns", {});
const wishlistView = createPath("/wishlist", {});

const exploreArticles = createPath("/explore", {});

const articleCreate = createPath("/article/create", {});

const articleView = createPath("/article/view/:articleId", {
  articleId: stringCodec,
});

const articleCheckIn = articleView.append("/check-in", {});

const checkInView = createPath("/checkIn/view/:checkInId", {
  checkInId: stringCodec,
});

export {
  profileView,
  collectionView,
  checkInsView,
  wishlistView,
  exploreArticles,
  articleCreate,
  articleView,
  articleCheckIn,
  checkInView,
};
