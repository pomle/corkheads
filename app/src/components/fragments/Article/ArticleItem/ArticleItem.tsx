import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import { useArticle } from "components/hooks/db/useArticles";
import { createArticle } from "types/Article";
import CutoutImageItem from "components/ui/layout/CutoutImageItem";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
  },
  displayName: {
    color: theme.color.title,
    fontSize: "14px",
  },
  meta: {
    color: theme.color.text,
    fontSize: "12px",
  },
}));

interface ArticleItemProps {
  pointer: { articleId: string; userId: string };
}

const ArticleItem: React.FC<ArticleItemProps> = ({
  pointer: { articleId, userId },
}) => {
  const article = useArticle(articleId)?.data || createArticle(articleId);

  const { displayName, photoURL, ratingAggregate } = article;

  const classes = useStyles();

  return (
    <CutoutImageItem photoURL={photoURL}>
      <div className={classes.content}>
        <div className={classes.displayName}>{displayName}</div>
        <div className={classes.meta}>
          {article.bottling && <BottlingMeta bottling={article.bottling} />}
        </div>
        <ItemRating aggregate={ratingAggregate} />
      </div>
    </CutoutImageItem>
  );
};

export default ArticleItem;
