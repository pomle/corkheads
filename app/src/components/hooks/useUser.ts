import { useSession } from "components/context/SessionContext";

export function useUser() {
  return useSession().user;
}
