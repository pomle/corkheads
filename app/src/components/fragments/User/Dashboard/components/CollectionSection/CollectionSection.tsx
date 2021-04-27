import React, { useMemo } from "react";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import CollectionArticleList from "components/fragments/Article/CollectionArticleList";

interface CollectionSectionProps {
  userId: string;
  toArticle: (articleId: string) => void;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({
  userId,
  toArticle,
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

  return (
    <CollectionArticleList pointers={request.results} toArticle={toArticle} />
  );
};

export default CollectionSection;
