import React, { useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import WishlistArticleItem from "components/fragments/Article/WishlistArticleItem";
import ItemList from "components/ui/layout/ItemList";
import {
  UserWishlistArticleQuery,
  useUserWishlistArticleQuery,
} from "components/hooks/db/useUserWishlistArticleQuery";
import * as paths from "components/route/paths";

interface WishlistSectionProps {
  userId: string;
}

const WishlistSection: React.FC<WishlistSectionProps> = ({ userId }) => {
  const history = useHistory();

  const goToArticle = useCallback(
    (articleId: string) => {
      const url = paths.articleView.url({ articleId });
      history.push(url);
    },
    [history]
  );

  const wishlistArticlesQuery = useMemo((): UserWishlistArticleQuery => {
    return {
      filters: {
        userId,
      },
      order: [{ field: "addedTimestamp", dir: "desc" }],
      limit: 3,
    };
  }, [userId]);

  const wishlistArticlesResult = useUserWishlistArticleQuery(
    wishlistArticlesQuery
  );

  return (
    <ItemList>
      {wishlistArticlesResult &&
        wishlistArticlesResult.map(({ articleEntry }) => {
          const article = articleEntry.data;

          return (
            <button
              key={articleEntry.id}
              onClick={() => goToArticle(articleEntry.id)}
            >
              {article && <WishlistArticleItem article={article} />}
            </button>
          );
        })}
    </ItemList>
  );
};

export default WishlistSection;
