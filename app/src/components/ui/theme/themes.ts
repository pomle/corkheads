import { Colors } from "./colors";

type ColorTheme = {
  accent: string;
  action: string;
  title: string;
  surface: string;
  text: string;
};

export type Theme = {
  color: ColorTheme;
};

export type ThemeName = "dusk" | "storm" | "cream" | "pure" | "sky";

const storm: Theme = {
  color: {
    action: Colors.ShinyGold,
    accent: Colors.MatteGold,
    title: Colors.ShinyGold,
    surface: Colors.Navy,
    text: Colors.MarbleBlue,
  },
};

const dusk: Theme = {
  color: {
    action: Colors.Gold,
    accent: Colors.ShinyGold,
    title: Colors.X1,
    surface: Colors.BlueSmoke,
    text: Colors.Sot,
  },
};

const sky: Theme = {
  color: {
    action: Colors.Navy,
    accent: Colors.MatteGold,
    title: Colors.Sot,
    surface: Colors.Sky,
    text: Colors.Sot,
  },
};

const cream: Theme = {
  color: {
    action: Colors.BlueSmoke,
    accent: Colors.MatteGold,
    title: Colors.BlueSmoke,
    surface: Colors.Milk,
    text: Colors.BlueSmoke,
  },
};

const pure: Theme = {
  color: {
    action: Colors.ShinyGold,
    accent: Colors.Gold,
    title: Colors.Navy,
    surface: Colors.White,
    text: Colors.Sot,
  },
};

export const themes: Record<ThemeName, Theme> = {
  cream,
  dusk,
  pure,
  storm,
  sky,
};
