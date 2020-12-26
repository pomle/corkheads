import React from "react";
import { makeStyles } from "@material-ui/styles";
import { createArticle } from "types/Article";
import CutoutImageItem from "components/ui/layout/CutoutImageItem";
import { Theme } from "components/ui/theme/themes";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import { createUserArticle } from "types/UserArticle";
import PassedTime from "components/ui/format/PassedTime";

const useStyles = makeStyles((theme: Theme) => ({
  WishlistArticleItem: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
    "& > .displayName": {
      color: theme.color.title,
      fontSize: "14px",
      fontWeight: 700,
    },
    "& > .meta": {
      color: theme.color.text,
      fontSize: "12px",
      fontWeight: 500,
    },
    "& > .date": {
      color: theme.color.text,
      fontSize: "10px",
      fontWeight: 500,
    },
  },
}));

interface WishlistArticleItemProps {
  pointer: { articleId: string; userId: string };
}

const WishlistArticleItem: React.FC<WishlistArticleItemProps> = ({
  pointer: { articleId, userId },
}) => {
  const article = useArticle(articleId)?.data || createArticle(articleId);
  const userArticle =
    useUserArticle(userId, articleId)?.data || createUserArticle(articleId);

  const { displayName, photoURL } = article;
  const addedDate = userArticle.wishlist?.addedTimestamp;

  const classes = useStyles();

  return (
    <CutoutImageItem photoURL={photoURL}>
      <div className={classes.WishlistArticleItem}>
        <div className="displayName">{displayName}</div>
        {article.bottling && (
          <div className="meta">
            <BottlingMeta bottling={article.bottling} />
          </div>
        )}
        {addedDate && (
          <div className="date">
            Added <PassedTime date={addedDate} />
          </div>
        )}
      </div>
    </CutoutImageItem>
  );
};

export default WishlistArticleItem;
