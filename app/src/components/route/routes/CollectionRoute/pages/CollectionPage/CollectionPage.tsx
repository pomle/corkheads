import React from "react";
import ErrorBoundary from "components/views/ErrorBoundaryView";
import BackButton from "components/ui/trigger/BackButton";
import UserCollectionView from "components/views/UserCollectionView";

interface CollectionPageProps {
  userId: string;
  routes: {
    back: () => void;
    article: (articleId: string) => void;
  };
}

const CollectionPage: React.FC<CollectionPageProps> = ({ userId, routes }) => {
  const nav = { back: <BackButton onClick={routes.back} /> };

  return (
    <ErrorBoundary nav={nav}>
      {() => <UserCollectionView nav={nav} routes={routes} userId={userId} />}
    </ErrorBoundary>
  );
};

export default CollectionPage;
