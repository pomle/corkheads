import { Locale } from "lib/i18n/localization";

export function localized(createTests: (locale: Locale) => void): void {
  const testedLocales = [Locale.enGB, Locale.svSE];

  testedLocales.forEach((locale) => {
    describe(`using locale ${locale}`, () => {
      createTests(locale);
    });
  });
}
