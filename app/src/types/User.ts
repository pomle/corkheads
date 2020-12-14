import { createConverter } from "lib/firestore/converter";

export type Profile = {
  displayName?: string;
  photoURL?: string;
};

export type User = {
  id: string;
  username?: string;
  profile?: Profile;
  readonly collectionSize?: number;
  readonly wishlistSize?: number;
  readonly checkInCount?: number;
};

export const FALLBACK: User = {
  id: "no-one",
};

export const converter = createConverter<User>({
  to(article) {
    return article;
  },

  from(snapshot) {
    return {
      ...FALLBACK,
      ...snapshot.data(),
    };
  },
});
