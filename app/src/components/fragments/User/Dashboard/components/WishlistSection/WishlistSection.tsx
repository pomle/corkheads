import React, { useMemo } from "react";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";
import WishlistList from "components/fragments/Article/WishlistList";

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

  return <WishlistList pointers={request.results} routes={routes} />;
};

export default WishlistSection;
