import React from "react";
import NavigationBar, { Nav } from "components/ui/layout/NavigationBar";
import ViewTitle from "components/ui/layout/ViewTitle";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { Locale } from "lib/i18n/localization";
import LocaleSelect from "components/fragments/Locale/LocaleSelect";
import * as Text from "./locales";

interface LanguageSelectViewProps {
  nav: Nav;
  onSelect: (locale: Locale) => void;
}

const LanguageSelectView: React.FC<LanguageSelectViewProps> = ({
  nav,
  onSelect,
}) => {
  return (
    <HeaderLayout>
      <ViewCap>
        <NavigationBar nav={nav}>
          <ViewTitle title={<Text.SelectLanguage />} />
        </NavigationBar>
      </ViewCap>
      <ViewBody>
        <LocaleSelect onSelect={onSelect} />
      </ViewBody>
    </HeaderLayout>
  );
};

export default LanguageSelectView;
