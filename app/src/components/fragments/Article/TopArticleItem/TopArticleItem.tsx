import React from "react";
import { makeStyles } from "@material-ui/styles";
import { createArticle } from "types/Article";
import { createUserArticle } from "types/UserArticle";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { useArticle } from "components/hooks/db/useArticles";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import CheckInCountBadge from "components/fragments/CheckIn/CheckInCountBadge";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";

const useStyles = makeStyles((theme: Theme) => ({
  TopArticleItem: {
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "4px",
    gridTemplateColumns: "1fr auto",
    "& .displayName": {
      color: theme.color.title,
      fontSize: "14px",
      fontWeight: 700,
    },
    "& .meta": {
      color: theme.color.text,
      fontSize: "12px",
      fontWeight: 500,
    },
    "& .checkIns": {
      gridArea: "1 / 2 / 4 / 3",
    },
    "& .rating": {},
  },
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
      <div className={classes.TopArticleItem}>
        <div className="displayName">{displayName || "• • •"}</div>
        {article.bottling && (
          <div className="meta">
            <BottlingMeta bottling={article.bottling} />
          </div>
        )}
        <div className="rating">{rating && <ItemRating rating={rating} />}</div>
        <div className="checkIns">
          <CheckInCountBadge count={checkIns} />
        </div>
      </div>
    </ImageItem>
  );
};

export default TopArticleItem;
