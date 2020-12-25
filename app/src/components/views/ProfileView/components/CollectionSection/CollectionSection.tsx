import React, { useMemo } from "react";
import CollectionList from "components/ui/layout/CollectionList";
import {
  UserCollectionArticleQuery,
  useUserCollectionArticleQuery,
} from "components/hooks/db/useUserCollectionArticleQuery";
import CollectionArticleItemButton from "components/fragments/Article/CollectionArticleItem/Button";

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
  const query = useMemo((): UserCollectionArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [{ field: "addedTimestamp", dir: "desc" }],
      limit: 4,
    };
  }, [userId]);

  const request = useUserCollectionArticleQuery(query);

  return (
    <CollectionList>
      {request.results.map((pointer) => {
        return (
          <CollectionArticleItemButton
            key={pointer.articleId}
            pointer={pointer}
            route={routes.article}
          />
        );
      })}
    </CollectionList>
  );
};

export default CollectionSection;
