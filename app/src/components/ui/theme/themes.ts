export const Colors = {
  BlueSmoke: "#222a3a",
  Cream: "#f2ecdd",
  MatteGold: "#ffefc4",
  Gold: "#f5d47b",
  ShinyGold: "#f4b16b",
  MarbleBlue: "#5f6674",
  X2: "#dde4ef",
  Milk: "#f9f6ee",
  Navy: "#1b2230",
  Sky: "#eef2f8",
  X1: "#a3aab4",
  Slate: "#3d4351",
  Sot: "#8f96a2",
  White: "#ffffff",
};

type ColorScheme = {
  accent: string;
  action: string;
  title: string;
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
    accent: Colors.MatteGold,
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
