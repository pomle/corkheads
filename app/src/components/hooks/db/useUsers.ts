import { useSingle, useStore } from "components/hooks/store2/useStore";
import { User } from "types/User";
import { useCollection } from "./useCollection";

export function useUsers(userIds: string[]) {
  return useStore<User>(useCollection().user, userIds);
}

export function useUser(userId?: string) {
  return useSingle(useUsers(userId ? [userId] : []), userId);
}
