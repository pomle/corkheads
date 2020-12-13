import React from "react";
import StylesProvider from "@material-ui/styles/StylesProvider";

export const StyleProviderMock: React.FC = ({ children }) => {
  return (
    <StylesProvider generateClassName={(rule) => rule.key}>
      {children}
    </StylesProvider>
  );
};
