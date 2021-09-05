import { createPath, codecs } from "@pomle/paths";

const root = createPath("", {});

export const paths = {
  root,
  article: root.append("/article/:articleId", {
    articleId: codecs.string,
  }),
  checkIn: root.append("/check-in/:checkInId", {
    checkInId: codecs.string,
  }),
  search: root.append("/search", {}),
  user: root.append("/user/:userId", {
    userId: codecs.string,
  }),
};
