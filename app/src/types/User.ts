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

export function createUser(id: string): User {
  return {
    id,
  };
}

export const DEFAULTS = createUser("no-one");

export const converter = createConverter<User>({
  to(user) {
    return user;
  },

  from(snapshot) {
    return {
      ...DEFAULTS,
      ...snapshot.data(),
    };
  },
});
