import React from "react";
import ViewStack from "components/ui/layout/ViewStack";
import HomeRoutes from "components/route/routes/HomeRoutes";
import { paths } from "components/route/paths";

const RootRoutes: React.FC = () => {
  return (
    <ViewStack>
      <HomeRoutes path={paths.root} />
    </ViewStack>
  );
};

export default RootRoutes;
