import { useCollectionResult } from "@pomle/react-firebase";
import { User } from "types/User";
import { useSingle } from "./helpers/useSingle";
import { useCollection } from "./useCollection";

export function useUsers(userIds: string[]) {
  return useCollectionResult<User>(useCollection().user, userIds);
}

export function useUser(userId?: string) {
  return useSingle(useUsers(userId ? [userId] : []), userId);
}
