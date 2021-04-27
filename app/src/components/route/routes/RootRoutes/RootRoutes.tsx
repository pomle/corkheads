import React from "react";
import { ScreenContext } from "components/context/ScreenContext";
import HomeRoutes from "components/route/routes/HomeRoutes";
import { paths } from "components/route/paths";

const RootRoutes: React.FC = () => {
  return (
    <ScreenContext originPath={paths.root} mountPath={paths.root}>
      <HomeRoutes path={paths.root} />
    </ScreenContext>
  );
};

export default RootRoutes;
