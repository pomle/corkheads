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

export const userImages: RouteMatchCallback = (match) => {
  return match.url.pathname.startsWith(
    "https://storage.googleapis.com/corkheads-generated-media/"
  );
};

export const fonts: RouteMatchCallback = (match) => {
  return match.url.pathname.startsWith("https://fonts.googleapis.com/");
};

export const fontCache = new StaleWhileRevalidate({
  cacheName: "fonts",
  plugins: [
    // Ensure that once this runtime cache reaches a maximum size the
    // least-recently used images are removed.
    new ExpirationPlugin({ maxEntries: 2 }),
  ],
});
