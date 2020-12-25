import React, { useMemo } from "react";
import CollectionList from "components/ui/layout/CollectionList";
import CollectionArticleItemButton from "components/fragments/Article/CollectionArticleItem/Button";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";

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
