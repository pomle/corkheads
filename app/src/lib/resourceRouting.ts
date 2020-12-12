import { ImageRef } from "types/ImageRef";

const mediaRoot =
  "https://firebasestorage.googleapis.com/v0/b/corkheads-user-public-media/o";

export function createMediaURL(imageRef: string, size: string) {
  return (
    [mediaRoot, encodeURIComponent([imageRef, size].join("/"))].join("/") +
    "?alt=media"
  );
}

export function resolveMediaURL(imageRef: string, size: string = "640x640") {
  if (imageRef.startsWith("https://")) {
    return imageRef;
  }

  return createMediaURL(imageRef, size);
}

export function resolvePhoto(resource?: {
  imageRef?: ImageRef;
  photoURL?: string;
}): ImageRef | undefined {
  if (!resource) {
    return undefined;
  }

  if (resource.imageRef) {
    return resource.imageRef;
  }

  if (resource.photoURL) {
    return {
      id: resource.photoURL,
    };
  }

  return undefined;
}
