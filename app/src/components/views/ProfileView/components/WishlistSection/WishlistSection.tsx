import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/styles";
import WishlistArticleItem from "components/fragments/Article/WishlistArticleItem";
import {
  UserWishlistArticleQuery,
  useUserWishlistArticleQuery,
} from "components/hooks/db/useUserWishlistArticleQuery";

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

  const classes = useStyles();

  return (
    <div className={classes.list}>
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
    </div>
  );
};

export default WishlistSection;
