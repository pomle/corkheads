import React from "react";
import { makeStyles } from "@material-ui/styles";
import CutoutImageItem from "components/ui/layout/CutoutImageItem";
import { Theme } from "components/ui/theme/themes";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import PassedTime from "components/ui/format/PassedTime";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";

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
  const article = useUserVirtualArticle(userId, articleId);

  const { displayName } = article;
  const addedDate = article.wishlist?.addedTimestamp;

  const classes = useStyles();

  return (
    <CutoutImageItem imageId={article.imageId}>
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
