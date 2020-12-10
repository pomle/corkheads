import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import ArticleDetailsView from "components/views/ArticleDetailsView";
import NavigationBar from "components/ui/layout/NavigationBar";
import BackButton from "components/ui/trigger/BackButton";

import { useUser } from "components/hooks/useUser";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import LoadingView from "components/views/LoadingView";
import * as rootPaths from "../../../../../../paths";
import * as parentPaths from "../../../../paths";
import * as paths from "../../paths";

interface CollectionArticlePageProps {
  articleId: string;
}

const CollectionArticlePage: React.FC<CollectionArticlePageProps> = ({
  articleId,
}) => {
  const history = useHistory();

  const routes = useMemo(
    () => ({
      collection: () => {
        const url = parentPaths.collectionView.url({});
        history.push(url);
      },
      picture: () => {
        const url = paths.articlePictureView.url({ articleId });
        history.push(url);
      },
      createCheckIn: () => {
        const url = rootPaths.articleCheckIn.url({ articleId });
        history.push(url);
      },
      checkIn: (checkInId: string) => {
        const url = rootPaths.checkInView.url({ checkInId });
        history.push(url);
      },
    }),
    [history, articleId]
  );

  const user = useUser();

  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.collection}>Collection</BackButton>}
    />
  );

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        if (!user) {
          return <LoadingView nav={nav} />;
        }

        return (
          <ArticleDetailsView
            key={articleId}
            nav={nav}
            routes={routes}
            userId={user.uid}
            articleId={articleId}
          />
        );
      }}
    </ErrorBoundary>
  );
};

export default CollectionArticlePage;
