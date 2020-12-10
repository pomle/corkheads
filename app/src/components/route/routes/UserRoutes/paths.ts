import { createPath } from "lib/path";

const profileView = createPath("/", {});
const toplistView = createPath("/toplist", {});
const collectionView = createPath("/collection", {});
const checkInsView = createPath("/checkIns", {});
const wishlistView = createPath("/wishlist", {});

export { profileView, toplistView, collectionView, checkInsView, wishlistView };
