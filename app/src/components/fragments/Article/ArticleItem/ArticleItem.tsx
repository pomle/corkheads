import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import CutoutImageItem from "components/ui/layout/CutoutImageItem";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";

const useStyles = makeStyles((theme: Theme) => ({
  ArticleItem: {
    display: "grid",
    gridGap: "2px",
    padding: "8px",
    "& .displayName": {
      color: theme.color.title,
      fontSize: "14px",
    },
    "& .meta": {
      fontSize: "12px",
    },
  },
}));

interface ArticleItemProps {
  pointer: { articleId: string; userId: string };
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  pointer: { articleId, userId },
}) => {
  const article = useUserVirtualArticle(userId, articleId);

  const { displayName, ratingAggregate } = article;

  const classes = useStyles();

  return (
    <CutoutImageItem imageId={article.imageId}>
      <div className={classes.ArticleItem}>
        <div className="displayName">{displayName}</div>
        <div className="meta">
          {article.bottling && <BottlingMeta bottling={article.bottling} />}
        </div>
        <ItemRating aggregate={ratingAggregate} />
      </div>
    </CutoutImageItem>
  );
};

export default ArticleItem;
