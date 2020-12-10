import React from "react";
import Screen from "components/route/Screen";
import ViewStack from "components/ui/layout/ViewStack";
import { SlideRight } from "components/ui/transitions/Slide";
import CollectionPage from "./pages/CollectionPage";
import CollectionArticlePage from "./pages/CollectionArticlePage";
import * as paths from "./paths";

const CollectionRoutes: React.FC = () => {
  return (
    <ViewStack>
      <CollectionPage />
      <Screen path={paths.articleView} transition={SlideRight}>
        {(params) => <CollectionArticlePage articleId={params.articleId} />}
      </Screen>
    </ViewStack>
  );
};

export default CollectionRoutes;
