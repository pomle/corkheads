import React, { useMemo } from "react";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import CollectionArticleList from "components/fragments/Article/CollectionArticleList";

interface CollectionSectionProps {
  userId: string;
  routes: {
    article: (articleId: string) => void;
  };
}

const CollectionSection: React.FC<CollectionSectionProps> = ({
  userId,
  routes,
}) => {
  const query = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId,
        collection: true,
      },
      order: [{ field: "collection.addedTimestamp", dir: "desc" }],
      limit: 4,
    };
  }, [userId]);

  const request = useUserArticleQuery(query);

  return <CollectionArticleList pointers={request.results} routes={routes} />;
};

export default CollectionSection;
