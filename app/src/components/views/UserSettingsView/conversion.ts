import { createUser, User } from "types/User";
import { Entries } from "./types";

export function toEntries(user: User): Entries {
  return {
    name: user.profile?.displayName || "",
    username: user.username || "",
  };
}

export function toUser(entries: Entries): User {
  const user = createUser("anonymous");
  const profile: User["profile"] = (user.profile = {});

  const name = entries.name;
  if (name.length) {
    profile.displayName = name;
  }

  const username = entries.username;
  if (username.length) {
  }

  return user;
}
