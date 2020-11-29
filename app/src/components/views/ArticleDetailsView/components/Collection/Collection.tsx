import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import { useUserWishlistArticle } from "components/hooks/db/useUserWishlistArticles";

const useStyles = makeStyles({
  Collection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridAutoFlow: "column",
    gridGap: "16px",
    padding: "16px",
  },
});

interface CollectionProps {
  userId: string;
  articleId: string;
}

const Collection: React.FC<CollectionProps> = ({ userId, articleId }) => {
  const userArticleEntry = useUserArticle(userId, articleId);
  const userWishlistArticleEntry = useUserWishlistArticle(userId, articleId);

  const setOwner = useCallback(
    (owner: boolean) => {
      if (!userArticleEntry) {
        return;
      }

      userArticleEntry.doc.set(
        {
          owner,
        },
        { merge: true }
      );
    },
    [userArticleEntry]
  );

  const setWishlist = useCallback(
    (active: boolean) => {
      if (!userWishlistArticleEntry) {
        return;
      }
      userWishlistArticleEntry.doc.set(
        {
          active,
        },
        { merge: true }
      );
    },
    [userWishlistArticleEntry]
  );

  const owner = !!userArticleEntry?.data?.owner;

  const onWishlist = !!userWishlistArticleEntry?.data?.active;

  const classes = useStyles();

  return (
    <div className={classes.Collection}>
      <ToggleButton toggled={owner} onClick={() => setOwner(!owner)}>
        I own it
      </ToggleButton>
      <ToggleButton
        toggled={onWishlist}
        onClick={() => setWishlist(!onWishlist)}
      >
        I want to try it
      </ToggleButton>
    </div>
  );
};

export default Collection;
