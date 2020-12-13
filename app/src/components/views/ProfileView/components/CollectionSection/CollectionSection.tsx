import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import CollectionArticleItem from "components/fragments/Article/CollectionArticleItem";
import CollectionList from "components/ui/layout/CollectionList";
import {
  UserCollectionArticleQuery,
  useUserCollectionArticleQuery,
} from "components/hooks/db/useUserCollectionArticleQuery";
import * as paths from "components/route/paths";

interface CollectionSectionProps {
  userId: string;
}

const CollectionSection: React.FC<CollectionSectionProps> = ({ userId }) => {
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

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
            onClick={() => goToArticle(articleEntry.id)}
          >
            {article && <CollectionArticleItem article={article} />}
          </button>
        );
      })}
    </CollectionList>
  );
};

export default CollectionSection;
