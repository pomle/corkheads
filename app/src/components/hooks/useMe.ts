import { useSession } from "components/context/SessionContext";
import { useUser } from "./db/useUsers";

export function useMe() {
  const session = useSession();
  return useUser(session?.user?.uid);
}
