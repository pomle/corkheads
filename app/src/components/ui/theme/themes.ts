export const Colors = {
  BlueSmoke: "#222a3a",
  Cream: "#f2ecdd",
  Gold: "#c9b47a",
  MarbleBlue: "#5f6674",
  Milk: "#f9f6ee",
  Navy: "#1b2230",
  ShinyGold: "#e8cb7b",
  Sky: "#eef2f8",
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
    accent: Colors.Gold,
    surface: Colors.Navy,
    text: Colors.MarbleBlue,
  },
};

const dusk: Theme = {
  color: {
    action: Colors.Gold,
    accent: Colors.Gold,
    surface: Colors.BlueSmoke,
    text: Colors.Sot,
  },
};

const sky: Theme = {
  color: {
    action: Colors.Navy,
    accent: Colors.Gold,
    surface: Colors.Sky,
    text: Colors.Sot,
  },
};

const cream: Theme = {
  color: {
    action: Colors.BlueSmoke,
    accent: Colors.Gold,
    surface: Colors.Milk,
    text: Colors.BlueSmoke,
  },
};

const pure: Theme = {
  color: {
    action: Colors.Navy,
    accent: Colors.Gold,
    surface: Colors.White,
    text: Colors.MarbleBlue,
  },
};

export const themes: Record<ThemeName, Theme> = {
  cream,
  dusk,
  pure,
  storm,
  sky,
};
