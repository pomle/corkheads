import React from "react";
import Themer from "components/ui/theme/Themer";
import AppRoute from "./routes/AppRoute";

const Routes: React.FC = () => {
  return (
    <Themer theme="storm">
      <AppRoute />
    </Themer>
  );
};

export default Routes;
