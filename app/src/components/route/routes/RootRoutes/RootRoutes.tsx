import React from "react";
import HomeRoutes from "components/route/routes/HomeRoutes";
import { paths } from "components/route/paths";

const RootRoutes: React.FC = () => {
  return <HomeRoutes path={paths.root} />;
};

export default RootRoutes;
