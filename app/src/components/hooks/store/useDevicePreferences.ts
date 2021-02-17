import { useMemo } from "react";
import { useLocalStorage, unnest } from "@pomle/use-local-storage";
import { Locale } from "lib/i18n/localization";
import { Namespaces } from "lib/storage/namespaces";

export enum AccountState {
  None,
  Created,
}

type DevicePrefs = {
  locale: Locale;
  accountState: AccountState;
};

function createDefaults(): DevicePrefs {
  return {
    locale: Locale.enGB,
    accountState: AccountState.None,
  };
}

export function useDevicePreferences() {
  const defaultPrefs = useMemo(createDefaults, []);
  return useLocalStorage<DevicePrefs>(Namespaces.DevicePrefs, defaultPrefs);
}

export const useDevicePreference = unnest(useDevicePreferences);
