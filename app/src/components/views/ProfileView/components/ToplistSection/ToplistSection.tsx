import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import TopArticleItem from "components/fragments/Article/TopArticleItem";
import ItemList from "components/ui/layout/ItemList";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import * as paths from "components/route/paths";

interface ToplistSectionProps {
  userId: string;
}

const ToplistSection: React.FC<ToplistSectionProps> = ({ userId }) => {
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const topArticlesQuery = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [
        {
          field: "checkIns",
          dir: "desc",
        },
      ],
      limit: 3,
    };
  }, [userId]);

  const topArticlesResult = useUserArticleQuery(topArticlesQuery);

  return (
    <ItemList>
      {topArticlesResult &&
        topArticlesResult.map(({ articleEntry, userArticleEntry }) => {
          const article = articleEntry.data;
          const userArticle = userArticleEntry.data;

          return (
            <button
              key={articleEntry.id}
              onClick={() => goToArticle(articleEntry.id)}
            >
              {article && userArticle && (
                <TopArticleItem article={article} userArticle={userArticle} />
              )}
            </button>
          );
        })}
    </ItemList>
  );
};

export default ToplistSection;
