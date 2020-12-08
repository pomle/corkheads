import React from "react";
import { makeStyles } from "@material-ui/styles";
import { UserArticle } from "types/UserArticle";
import { Article } from "types/Article";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.action,
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

interface TopArticleItemProps {
  article: Article;
  userArticle: UserArticle;
}

const TopArticleItem: React.FC<TopArticleItemProps> = ({
  article,
  userArticle,
}) => {
  const { displayName, photoURL } = article;
  const { checkIns, rating } = userArticle;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <div></div>
      <div className={classes.checkIns}>{checkIns} check ins</div>
      <div className={classes.rating}>
        {rating && <ItemRating rating={rating} />}
      </div>
    </ImageItem>
  );
};

export default TopArticleItem;
