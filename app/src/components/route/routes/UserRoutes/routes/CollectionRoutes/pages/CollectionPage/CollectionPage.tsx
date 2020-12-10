import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useUser } from "components/hooks/useUser";
import NavigationBar from "components/ui/layout/NavigationBar";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import LoadingView from "components/views/LoadingView";
import UserCollectionView from "components/views/UserCollectionView";
import * as rootPaths from "components/route/paths";
import * as paths from "../../paths";

const CollectionPage: React.FC = () => {
  const history = useHistory();
  const user = useUser();

  const routes = useMemo(
    () => ({
      profile: () => {
        const url = rootPaths.profileView.url({});
        history.push(url);
      },
      article: (articleId: string) => {
        const url = paths.articleView.url({ articleId });
        history.push(url);
      },
    }),
    [history]
  );

  const nav = (
    <NavigationBar
      back={<BackButton onClick={routes.profile}>Profile</BackButton>}
    />
  );

  if (!user) {
    return <LoadingView nav={nav} />;
  }

  return (
    <ErrorBoundary nav={nav}>
      {() => {
        return (
          <UserCollectionView nav={nav} routes={routes} userId={user.uid} />
        );
      }}
    </ErrorBoundary>
  );
};

export default CollectionPage;
