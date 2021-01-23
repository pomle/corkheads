import { createConverter } from "lib/firestore/converter";

type Size = {
  x: number;
  y: number;
};

type Format = {
  url: string;
  resolution: Size;
};

export type Image = {
  id: string;
  userId: string;
  source?: string;
  formats: Format[];
};

const DEFAULTS = {
  id: "",
  userId: "",
  formats: [],
};

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
