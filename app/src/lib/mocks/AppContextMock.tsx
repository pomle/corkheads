import React from "react";
import { StyleProviderMock } from "./StyleProviderMock";
import ThemeProvider from "components/ui/theme/ThemeProvider";

export const AppContextMock: React.FC = ({ children }) => {
  return (
    <StyleProviderMock>
      <ThemeProvider theme="dusk">{children}</ThemeProvider>
    </StyleProviderMock>
  );
};
