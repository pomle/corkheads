export const Colors = {
  BlueSmoke: "#222a3a",
  Cream: "#f2ecdd",
  Gold: "#f1e7cd",
  MatteGold: "#f9f6ee",
  MarbleBlue: "#5f6674",
  X2: "#dde4ef",
  Milk: "#f9f6ee",
  Navy: "#1b2230",
  ShinyGold: "#c9b47a",
  Sky: "#eef2f8",
  X1: "#a3aab4",
  Slate: "#3d4351",
  Sot: "#8f96a2",
  White: "#ffffff",
};

type ColorScheme = {
  accent: string;
  action: string;
  surface: string;
  text: string;
};

export type Theme = {
  color: ColorScheme;
};

export type ThemeName = "dusk" | "storm" | "cream" | "pure" | "sky";

const storm: Theme = {
  color: {
    action: Colors.ShinyGold,
    accent: Colors.MatteGold,
    surface: Colors.Navy,
    text: Colors.MarbleBlue,
  },
};

const dusk: Theme = {
  color: {
    action: Colors.MatteGold,
    accent: Colors.MatteGold,
    surface: Colors.BlueSmoke,
    text: Colors.Sot,
  },
};

const sky: Theme = {
  color: {
    action: Colors.Navy,
    accent: Colors.MatteGold,
    surface: Colors.Sky,
    text: Colors.Sot,
  },
};

const cream: Theme = {
  color: {
    action: Colors.BlueSmoke,
    accent: Colors.MatteGold,
    surface: Colors.Milk,
    text: Colors.BlueSmoke,
  },
};

const pure: Theme = {
  color: {
    action: Colors.Navy,
    accent: Colors.MatteGold,
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
