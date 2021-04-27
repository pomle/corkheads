import { createPath } from "lib/path";
import { useCallback } from "react";
import { useHistory } from "react-router";
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
  user: root.append("/user/:userId", {
    userId: stringCodec,
  }),
};

export function useCheckInRoute() {
  const history = useHistory();

  return useCallback(
    (checkInId: string) => {
      const url = paths.checkIn.url({ checkInId });
      history.push(url);
    },
    [history]
  );
}
