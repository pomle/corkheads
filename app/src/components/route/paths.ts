import { createPath, Path, PathCodec } from "lib/path";
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
  user: root.append("/user/:userId", {
    userId: stringCodec,
  }),
};

function usePath<T extends Path<PathCodec>>(path: T) {
  const history = useHistory();

  return useCallback(
    (params: Parameters<T["url"]>[0]) => {
      const url = path.url(params);
      history.push(url);
    },
    [history, path]
  );
}

export function useArticleRoute() {
  return usePath(paths.article);
}

export function useCheckInRoute() {
  return usePath(paths.checkIn);
}

export function useUserRoute() {
  return usePath(paths.user);
}
