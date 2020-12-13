import React from "react";
import { StyleProviderMock } from "./StyleProviderMock";
import Themer from "components/ui/theme/Themer";

export const AppContextMock: React.FC = ({ children }) => {
  return (
    <StyleProviderMock>
      <Themer theme="dusk">{children}</Themer>
    </StyleProviderMock>
  );
};
