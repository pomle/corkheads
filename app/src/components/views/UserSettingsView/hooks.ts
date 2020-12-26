import { useMemo } from "react";
import { useUserProfile } from "components/hooks/db/useUserProfile";
import { debounce } from "lib/debounce";
import { User } from "types/User";

const STORE_DELAY = 3000;

export function useProfile(userId: string) {
  const { user, updateProfile } = useUserProfile(userId);

  const handleUserChange = useMemo(() => {
    const setUser = (user: User) => {
      updateProfile(user.profile);
    };
    return debounce(setUser, STORE_DELAY);
  }, [updateProfile]);

  return useMemo(
    () => ({
      user,
      handleUserChange,
    }),
    [user, handleUserChange]
  );
}
