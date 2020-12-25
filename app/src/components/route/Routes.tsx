import React from "react";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import AppRoute from "./routes/AppRoute";

const Routes: React.FC = () => {
  return (
    <ThemeProvider theme="storm">
      <AppRoute />
    </ThemeProvider>
  );
};

export default Routes;
