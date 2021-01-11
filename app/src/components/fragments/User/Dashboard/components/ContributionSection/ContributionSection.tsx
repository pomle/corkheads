import React, { useMemo } from "react";
import {
  useArticleQuery,
  ArticleQuery,
} from "components/hooks/db/useArticleQuery";
import ItemList from "components/ui/layout/ItemList";
import ArticleItem from "components/fragments/Article/ArticleItem";

interface ContributionSectionProps {
  userId: string;
  routes: {
    article: (article: string) => void;
  };
}

const ContributionSection: React.FC<ContributionSectionProps> = ({
  userId,
  routes,
}) => {
  const query = useMemo((): ArticleQuery => {
    return {
      filters: {
        creatorUserIds: [userId],
      },
      limit: 3,
    };
  }, [userId]);

  const request = useArticleQuery(query);

  const pointers = useMemo(() => {
    return request.results.map((p) => {
      return {
        ...p,
        userId,
      };
    });
  }, [request, userId]);

  return (
    <ItemList>
      {pointers.map((pointer) => {
        return (
          <button
            key={pointer.articleId}
            onClick={() => routes.article(pointer.articleId)}
          >
            <ArticleItem pointer={pointer} />
          </button>
        );
      })}
    </ItemList>
  );
};

export default ContributionSection;
