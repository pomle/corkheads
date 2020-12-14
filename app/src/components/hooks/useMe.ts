import { useSession } from "components/context/SessionContext";

export function useMe() {
  return useSession().user;
}
