import { createPath } from "lib/path";
import { stringCodec } from "./codecs";

const root = createPath("", {});

export const paths = {
  root,
  article: root.append("/article/:articleId", {
    articleId: stringCodec,
  }),
  checkIn: root.append("/check-in/:checkInId", {
    checkInId: stringCodec,
  }),
  search: root.append("/search", {}),
};
