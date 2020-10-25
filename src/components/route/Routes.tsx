import React from "react";
import AppRoute from "./routes/AppRoute";
import Screen from "./Screen";
import ExploreArticlesView from "components/views/ExploreArticlesView";
import * as paths from "./paths";

const Routes: React.FC = () => {
  return (
    <AppRoute>
      <Screen path={paths.exploreArticles}>
        {() => <ExploreArticlesView/>}
      </Screen>
    </AppRoute>
  );
};

export default Routes;
