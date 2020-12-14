import { useStore } from "components/hooks/store2/useStore";
import { useMemo } from "react";
import { User } from "types/User";
import { useCollection } from "./useCollection";

export function useUsers(userIds: string[]) {
  return useStore<User>(useCollection().user, userIds);
}

export function useUser(userId?: string) {
  const result = useUsers(userId ? [userId] : []);
  return useMemo(() => {
    if (userId === undefined || result.size === 0) {
      return undefined;
    }

    return result.get(userId);
  }, [userId, result]);
}
