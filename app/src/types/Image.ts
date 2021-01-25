import { createConverter } from "lib/firestore/converter";

type Size = {
  x: number;
  y: number;
};

type Format = {
  url: string;
  mime: string;
  resolution: Size;
};

export type Image = {
  id: string;
  userId: string;
  source?: string;
  formats: Format[];
};

export function createImage(id: string): Image {
  return {
    id: "",
    userId: "",
    formats: [],
  };
}

const DEFAULTS = createImage("default-image");

export const converter = createConverter<Image>({
  to(image) {
    return image;
  },

  from(snapshot) {
    return {
      ...DEFAULTS,
      ...snapshot.data(),
    };
  },
});
