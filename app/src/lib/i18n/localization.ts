import { useLocale } from "components/context/InternationalizationContext";

export enum Locale {
  enGB = "en_GB",
  svSE = "sv_SE"
}

export type Localizable<T> = { [key in Locale]: T };

const FALLBACK_LOCALE = Locale.enGB;

export function localize<Props>(
  renderers: Localizable<React.FC<Props> | React.ReactNode>
): React.FC<Props> {
  const LocalizedComponent: React.FC<Props> = props => {
    const [locale] = useLocale();
    const renderer = renderers[locale] || renderers[FALLBACK_LOCALE];
    if (renderer instanceof Function) {
      return renderer(props);
    }
    return renderer;
  };
  return LocalizedComponent;
}
