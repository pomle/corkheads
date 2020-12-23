import React, { useMemo } from "react";
import CollectionArticleItem from "components/fragments/Article/CollectionArticleItem";
import CollectionList from "components/ui/layout/CollectionList";
import {
  UserCollectionArticleQuery,
  useUserCollectionArticleQuery,
} from "components/hooks/db/useUserCollectionArticleQuery";

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
      {request.results.map(({ articleEntry }) => {
        const article = articleEntry.data;

        return (
          <button
            key={articleEntry.id}
            onClick={() => routes.article(articleEntry.id)}
          >
            {article && <CollectionArticleItem article={article} />}
          </button>
        );
      })}
    </CollectionList>
  );
};

export default CollectionSection;
