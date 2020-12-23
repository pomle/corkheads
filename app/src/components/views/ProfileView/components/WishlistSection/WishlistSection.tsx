import React, { useMemo } from "react";
import WishlistArticleItem from "components/fragments/Article/WishlistArticleItem";
import ItemList from "components/ui/layout/ItemList";
import {
  UserWishlistArticleQuery,
  useUserWishlistArticleQuery,
} from "components/hooks/db/useUserWishlistArticleQuery";

interface WishlistSectionProps {
  userId: string;
  routes: {
    article: (article: string) => void;
  };
}

const WishlistSection: React.FC<WishlistSectionProps> = ({
  userId,
  routes,
}) => {
  const query = useMemo((): UserWishlistArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [{ field: "addedTimestamp", dir: "desc" }],
      limit: 3,
    };
  }, [userId]);

  const request = useUserWishlistArticleQuery(query);

  return (
    <ItemList>
      {request.results.map(({ articleEntry }) => {
        const article = articleEntry.data;

        return (
          <button
            key={articleEntry.id}
            onClick={() => routes.article(articleEntry.id)}
          >
            {article && <WishlistArticleItem article={article} />}
          </button>
        );
      })}
    </ItemList>
  );
};

export default WishlistSection;
