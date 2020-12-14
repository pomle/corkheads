import { useSession } from "components/context/SessionContext";
import { useMemo } from "react";
import { User } from "types/User";
export function useMe(): User | undefined {
  const session = useSession();

  return useMemo(() => {
    if (!session.user) {
      return;
    }

    return {
      id: session.user.uid,
      email: null,
    };
  }, [session.user]);
}
