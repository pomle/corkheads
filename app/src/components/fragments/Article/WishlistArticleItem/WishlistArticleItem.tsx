import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";
import { createArticle } from "types/Article";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import { useArticle } from "components/hooks/db/useArticles";

const useStyles = makeStyles((theme: Theme) => ({
  WishlistItem: {
    alignItems: "center",
    background: Colors.Sky,
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
  displayName: {
    color: "#1b2230",
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  subText: {
    color: Colors.MarbleBlue,
    fontSize: "12px",
    fontWeight: 500,
  },
  content: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
  },
}));

interface WishlistArticleItemProps {
  pointer: { articleId: string };
}

const WishlistArticleItem: React.FC<WishlistArticleItemProps> = ({
  pointer: { articleId },
}) => {
  const article = useArticle(articleId)?.data || createArticle(articleId);

  const { displayName, photoURL } = article;

  const classes = useStyles();

  return (
    <div className={classes.WishlistItem}>
      <div className={classes.photo}>
        <Photo url={photoURL} />
      </div>
      <div className={classes.content}>
        <div className={classes.displayName}>{displayName}</div>
        <div className={classes.subText}>
          {article.bottling && <BottlingMeta bottling={article.bottling} />}
        </div>
      </div>
    </div>
  );
};

export default WishlistArticleItem;
