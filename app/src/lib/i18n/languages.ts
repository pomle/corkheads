/*
Provides translation of languages names for languages.

Answers the question "what is English called in Swedish".
*/
import { Localizable, Locale as LC } from "./localization";

export const EN: Localizable<string> = {
  [LC.enGB]: "English",
  [LC.svSE]: "Swedish",
};

export const SE: Localizable<string> = {
  [LC.enGB]: "Engelska",
  [LC.svSE]: "Svenska",
};
