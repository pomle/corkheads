import { useAuth } from "./useAuth";

export function useUser() {
  return useAuth().user;
}
