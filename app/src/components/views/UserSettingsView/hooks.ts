import { useMemo } from "react";
import { useUserProfile } from "components/hooks/db/useUserProfile";
import { debounce } from "lib/debounce";
import { User } from "types/User";

export function useProfile(userId: string) {
  const { user, updateProfile } = useUserProfile(userId);

  const handleUserChange = useMemo(() => {
    const setUser = (user: User) => {
      updateProfile(user.profile);
    };
    return debounce(setUser, 2500);
  }, [updateProfile]);

  return useMemo(
    () => ({
      user,
      handleUserChange,
    }),
    [user, handleUserChange]
  );
}
