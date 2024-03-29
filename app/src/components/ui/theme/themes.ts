import { Colors } from "./colors";

type ColorTheme = {
  accent: Colors;
  action: Colors;
  panel: Colors;
  surface: Colors;
  text: Colors;
  title: Colors;
};

export type Theme = {
  color: ColorTheme;
};

export type ThemeName = "dusk" | "storm" | "pure" | "sky";

const storm: Theme = {
  color: {
    action: Colors.Gold,
    accent: Colors.Gold,
    title: Colors.Gold,
    panel: Colors.BlueSmoke,
    surface: Colors.Navy,
    text: Colors.MarbleBlue,
  },
};

const dusk: Theme = {
  color: {
    accent: Colors.ShinyGold,
    action: Colors.Gold,
    panel: Colors.X3,
    surface: Colors.BlueSmoke,
    text: Colors.MarbleBlue,
    title: Colors.Sot,
  },
};

const sky: Theme = {
  color: {
    accent: Colors.MatteGold,
    action: Colors.Navy,
    panel: Colors.X2,
    surface: Colors.Sky,
    text: Colors.MarbleBlue,
    title: Colors.BlueSmoke,
  },
};

const pure: Theme = {
  color: {
    accent: Colors.Gold,
    action: Colors.ShinyGold,
    panel: Colors.X2,
    surface: Colors.White,
    text: Colors.MarbleBlue,
    title: Colors.Navy,
  },
};

export const themes: Record<ThemeName, Theme> = {
  dusk,
  pure,
  storm,
  sky,
};
