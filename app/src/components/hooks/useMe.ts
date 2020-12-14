import { useSession } from "components/context/SessionContext";
import { User } from "types/User";
import { useUser } from "./db/useUsers";

export function useMe(): User | undefined {
  const session = useSession();
  return useUser(session?.user?.uid);
}
