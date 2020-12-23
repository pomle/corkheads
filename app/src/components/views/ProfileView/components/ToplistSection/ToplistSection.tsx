import React from "react";
import TopArticleItem from "components/fragments/Article/TopArticleItem";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";

interface ToplistSectionProps {
  userId: string;
  routes: {
    article: (articleId: string) => void;
  };
}

const ToplistSection: React.FC<ToplistSectionProps> = ({ userId, routes }) => {
  const request = useUserArticleToplistQuery(userId, 3);

  return (
    <ItemList>
      {request.results.map(({ articleEntry, userArticleEntry }) => {
        const article = articleEntry.data;
        const userArticle = userArticleEntry.data;

        return (
          <button
            key={articleEntry.id}
            onClick={() => routes.article(articleEntry.id)}
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
