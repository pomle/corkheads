import React from "react";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Locale } from "lib/i18n/localization";
import LocaleSelect from "components/fragments/Locale/LocaleSelect";
import * as Text from "./locales";

interface LanguageSelectViewProps {
  nav: React.ReactNode;
  onSelect: (locale: Locale) => void;
}

const LanguageSelectView: React.FC<LanguageSelectViewProps> = ({
  nav,
  onSelect,
}) => {
  return (
    <HeaderLayout>
      <ViewCap>
        {nav}
        <ViewTitle title={<Text.SelectLanguage />} />
      </ViewCap>
      <ViewBody>
        <LocaleSelect onSelect={onSelect} />
      </ViewBody>
    </HeaderLayout>
  );
};

export default LanguageSelectView;
