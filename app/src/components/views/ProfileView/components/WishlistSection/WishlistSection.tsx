import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import WishlistArticleItemButton from "components/fragments/Article/WishlistArticleItem/Button";
import {
  UserArticleQuery,
  useUserArticleQuery,
} from "components/hooks/db/useUserArticleQuery";

const useStyles = makeStyles({
  list: {
    display: "grid",
    gridGap: "16px",
  },
});

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

  const classes = useStyles();

  return (
    <div className={classes.list}>
      {request.results.map((pointer) => (
        <WishlistArticleItemButton
          key={pointer.articleId}
          pointer={pointer}
          route={routes.article}
        />
      ))}
    </div>
  );
};

export default WishlistSection;
