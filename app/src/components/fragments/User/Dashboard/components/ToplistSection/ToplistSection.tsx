import React from "react";
import ItemList from "components/ui/layout/ItemList";
import { useUserArticleToplistQuery } from "components/hooks/db/useUserArticleToplistQuery";
import TopArticleItemButton from "components/fragments/Article/TopArticleItem/Button";

interface ToplistSectionProps {
  userId: string;
  toArticle: (articleId: string) => void;
}

const ToplistSection: React.FC<ToplistSectionProps> = ({
  userId,
  toArticle,
}) => {
  const request = useUserArticleToplistQuery(userId, 3);

  return (
    <ItemList divided>
      {request.results.map((pointer) => {
        return (
          <TopArticleItemButton
            key={pointer.articleId}
            pointer={pointer}
            toArticle={toArticle}
          />
        );
      })}
    </ItemList>
  );
};

export default ToplistSection;
