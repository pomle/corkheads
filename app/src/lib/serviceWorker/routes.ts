/* eslint-disable no-restricted-globals */
import { RouteMatchCallback } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { StaleWhileRevalidate } from "workbox-strategies";

export const imageCache = new StaleWhileRevalidate({
  cacheName: "images",
  plugins: [
    // Ensure that once this runtime cache reaches a maximum size the
    // least-recently used images are removed.
    new ExpirationPlugin({ maxEntries: 200 }),
  ],
});

export const publicImages: RouteMatchCallback = (match) => {
  const { url } = match;
  return url.origin === self.location.origin && url.pathname.endsWith(".png");
};

export const userImages: RouteMatchCallback = (match) => {
  return match.url.pathname.startsWith(
    "https://storage.googleapis.com/corkheads-generated-media/"
  );
};
