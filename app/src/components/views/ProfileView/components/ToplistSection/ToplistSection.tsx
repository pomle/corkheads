import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import TopArticleItem from "components/fragments/Article/TopArticleItem";
import ItemList from "components/ui/layout/ItemList";
import * as paths from "components/route/paths";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";

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

  const result = useUserArticleToplistQuery(userId, 10);

  return (
    <ItemList>
      {result &&
        result.map(({ articleEntry, userArticleEntry }) => {
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
