import { useMemo } from "react";
import { Locale } from "lib/i18n/localization";
import { Namespaces } from "lib/storage/namespaces";
import { useStorage, unnest } from "./useStorage";

type DevicePrefs = {
  locale: Locale;
  email: string;
};

function createDefaults(): DevicePrefs {
  return {
    locale: Locale.enGB,
    email: "",
  };
}

export function useDevicePreferences() {
  const defaultPrefs = useMemo(createDefaults, []);
  return useStorage<DevicePrefs>(Namespaces.DevicePrefs, defaultPrefs);
}

export const useDevicePreference = unnest(useDevicePreferences);
