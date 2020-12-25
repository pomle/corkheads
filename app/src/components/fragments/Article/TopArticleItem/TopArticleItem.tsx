import React from "react";
import { makeStyles } from "@material-ui/styles";
import { createArticle } from "types/Article";
import { createUserArticle } from "types/UserArticle";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.title,
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  subText: {
    color: theme.color.text,
    fontSize: "12px",
    fontWeight: 500,
  },
  checkIns: {
    color: "#e2e2e2",
    fontSize: "10px",
    textAlign: "right",
  },
  rating: {},
}));

type TopArticleItemPointer = {
  articleId: string;
  userId: string;
};

interface TopArticleItemProps {
  pointer: TopArticleItemPointer;
}

const TopArticleItem: React.FC<TopArticleItemProps> = ({
  pointer: { articleId, userId },
}) => {
  const article = useArticle(articleId)?.data || createArticle(articleId);
  const userArticle =
    useUserArticle(userId, articleId)?.data || createUserArticle(articleId);

  const { displayName, photoURL } = article;
  const { checkIns, rating } = userArticle;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName || "• • •"}</div>
      <div></div>
      <div className={classes.checkIns}>{checkIns} check ins</div>
      <div className={classes.rating}>
        {rating && <ItemRating rating={rating} />}
      </div>
    </ImageItem>
  );
};

export default TopArticleItem;
