import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { ThemeName, themes } from "./themes";

interface ThemerProps {
  theme: ThemeName;
}

const Themer: React.FC<ThemerProps> = ({ theme, children }) => {
  return <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>;
};

export default Themer;
