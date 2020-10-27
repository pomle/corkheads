import React, { createContext, useContext, useMemo } from "react";
import { Locale } from "lib/i18n/localization";
import { useDevicePreference } from "components/hooks/store/useDevicePreferences";

type InternationalizationContextValue = {
  locale: [Locale, (locale: Locale) => void];
};

export const Context = createContext<InternationalizationContextValue | null>(
  null
);

export const InternationalizationContext: React.FC = ({ children }) => {
  const locale = useDevicePreference("locale");

  const value = useMemo(() => {
    return {
      locale
    };
  }, [locale]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

function useInternationalizationContext() {
  const value = useContext(Context);
  if (value === null) {
    throw new Error(
      "useInternationalizationContext used without InternationalizationContext"
    );
  }
  return value;
}

export function useLocale() {
  return useInternationalizationContext().locale;
}
