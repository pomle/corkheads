import React from "react";
import { ThemeProvider as Provider } from "@material-ui/styles";
import { ThemeName, themes } from "./themes";

interface ThemeProviderProps {
  theme: ThemeName;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, children }) => {
  return <Provider theme={themes[theme]}>{children}</Provider>;
};

export default ThemeProvider;
