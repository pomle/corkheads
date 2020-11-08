import React, { useMemo, useState } from "react";
import { Locale } from "lib/i18n/localization";
import { Context } from "components/context/InternationalizationContext";

interface InternationalizationContextMockProps {
  initialLocale?: Locale;
}

export const InternationalizationContextMock: React.FC<InternationalizationContextMockProps> = ({
  initialLocale = Locale.enGB,
  children,
}) => {
  const locale = useState<Locale>(initialLocale);

  const value = useMemo(() => {
    return {
      locale,
    };
  }, [locale]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
