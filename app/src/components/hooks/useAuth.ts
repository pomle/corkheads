import { useSession } from "components/context/SessionContext";

export function useAuth() {
  return useSession().auth;
}
