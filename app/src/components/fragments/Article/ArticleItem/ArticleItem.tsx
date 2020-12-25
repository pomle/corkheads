import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import { useArticle } from "components/hooks/db/useArticles";
import { createArticle } from "types/Article";
import Photo from "components/ui/layout/Photo";

function color(theme: Theme) {
  return Colors.Gold;
}

function highlightColor(theme: Theme) {
  return Colors.MatteGold;
}

const useStyles = makeStyles((theme: Theme) => ({
  ArticleItem: {
    alignItems: "center",
    background: Colors.BlueSmoke,
    borderRadius: "12px",
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "72px auto",
  },
  photo: {
    borderRadius: "12px 0 0 12px",
    overflow: "hidden",
    height: "64px",
    width: "64px",
  },
  content: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
  },
  displayName: {
    color: color(theme),
    fontSize: "14px",
    lineHeight: 1.25,
  },
  meta: {
    color: theme.color.text,
    fontSize: "12px",
  },
  subText: {
    color: Colors.MarbleBlue,
    fontSize: "12px",
    fontWeight: 500,
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
    <div className={classes.ArticleItem}>
      <div className={classes.photo}>
        <Photo url={photoURL} />
      </div>
      <div className={classes.content}>
        <div className={classes.displayName}>{displayName}</div>
        <div className={classes.meta}>
          {article.bottling && <BottlingMeta bottling={article.bottling} />}
        </div>
        <ItemRating aggregate={ratingAggregate} />
      </div>
    </div>
  );
};

export default ArticleItem;
