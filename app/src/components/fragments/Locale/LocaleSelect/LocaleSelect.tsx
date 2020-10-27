import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import ItemList from "components/ui/layout/ItemList";
import { Locale, Localizable } from "lib/i18n/localization";
import { useLocale } from "components/context/InternationalizationContext";
import * as Lang from "lib/i18n/languages";
import ActiveSelection from "components/ui/trigger/ActiveSelection";
import ItemListItem from "components/ui/layout/ItemListItem";

const useStyles = makeStyles({
  nativeName: {
    fontSize: 16,
    fontWeight: 500
  },
  selectedName: {
    fontSize: 14,
    fontWeight: 400,
    marginTop: 6
  }
});

const localeNames: Localizable<Localizable<string>> = {
  [Locale.enGB]: Lang.EN,
  [Locale.svSE]: Lang.SE
};

interface LocaleSelectProps {
  onSelect: (locale: Locale) => void;
}

const LocaleSelect: React.FC<LocaleSelectProps> = ({ onSelect }) => {
  const [locale] = useLocale();

  const localeOptions = useMemo(() => {
    // Sort locales according to name of language in selected locale.
    const localeName = localeNames[locale];
    const locales = [Locale.enGB, Locale.svSE];
    return locales.sort((a, b) => (localeName[a] < localeName[b] ? -1 : 1));
  }, [locale]);

  const classes = useStyles();

  return (
    <ItemList>
      {localeOptions.map(localeOption => {
        const current = localeOption === locale;
        return (
          <ItemListItem
            onClick={() => onSelect(localeOption)}
            key={localeOption}
          >
            <ActiveSelection checked={current}>
              <div className={classes.nativeName}>
                {localeNames[localeOption][localeOption]}
              </div>
              {!current && (
                <div className={classes.selectedName}>
                  {localeNames[locale][localeOption]}
                </div>
              )}
            </ActiveSelection>
          </ItemListItem>
        );
      })}
    </ItemList>
  );
};

export default LocaleSelect;
