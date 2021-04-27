import React, { useMemo } from "react";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import WishlistList from "components/fragments/Article/WishlistList";

interface WishlistSectionProps {
  userId: string;
  toArticle: (article: string) => void;
}

const WishlistSection: React.FC<WishlistSectionProps> = ({
  userId,
  toArticle,
}) => {
  const query = useMemo((): UserArticleQuery => {
    return {
      filters: {
        userId,
        wishlist: true,
      },
      order: [{ field: "wishlist.addedTimestamp", dir: "desc" }],
      limit: 3,
    };
  }, [userId]);

  const request = useUserArticleQuery(query);

  return <WishlistList pointers={request.results} toArticle={toArticle} />;
};

export default WishlistSection;
