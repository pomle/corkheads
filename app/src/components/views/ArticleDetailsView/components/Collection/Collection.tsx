import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import ToggleButton from "components/ui/trigger/ToggleButton";
import { useUserWishlistArticle } from "components/hooks/db/useUserWishlistArticles";
import { useUserCollectionArticle } from "components/hooks/db/useUserCollectionArticles";

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
  const userCollectionArticleEntry = useUserCollectionArticle(
    userId,
    articleId
  );
  const userWishlistArticleEntry = useUserWishlistArticle(userId, articleId);

  const setOwner = useCallback(
    (active: boolean) => {
      if (!userCollectionArticleEntry) {
        return;
      }
      userCollectionArticleEntry.doc.set(
        {
          active,
        },
        { merge: true }
      );
    },
    [userCollectionArticleEntry]
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

  const inCollection = !!userCollectionArticleEntry?.data?.active;
  const onWishlist = !!userWishlistArticleEntry?.data?.active;

  const classes = useStyles();

  return (
    <div className={classes.Collection}>
      <ToggleButton
        toggled={inCollection}
        onClick={() => setOwner(!inCollection)}
      >
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
