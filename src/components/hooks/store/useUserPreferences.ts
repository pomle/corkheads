import { useMemo } from "react";
import { Namespaces } from "lib/storage/namespaces";
import { useStorage, unnest } from "./useStorage";

type UserPrefs = {
};

function createDefaults(): UserPrefs {
  return {
    showNotifications: true,
    selectedSiteId: undefined,
    selectedVehicleId: undefined
  };
}

export function useUserPreferences() {
  const defaultPrefs = useMemo(createDefaults, []);

  const namespace = useMemo(() => {
    return [Namespaces.UserPrefs, "unknown"].join("/");
  }, []);

  return useStorage<UserPrefs>(namespace, defaultPrefs);
}

export const useUserPreference = unnest(useUserPreferences);
