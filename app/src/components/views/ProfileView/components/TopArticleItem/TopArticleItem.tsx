import React from "react";
import { makeStyles } from "@material-ui/styles";
import { UserArticle } from "types/userArticle";
import { Article } from "types/article";
import ImageItem from "components/ui/layout/ImageItem";
import Rating from "components/ui/indicators/Rating";

const useStyles = makeStyles({
  displayName: {
    fontSize: "17px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  manufacturer: {
    fontSize: "12px",
    fontWeight: 500,
  },
  checkIns: {
    color: "#e2e2e2",
    fontSize: "10px",
    textAlign: "right",
  },
  rating: {
    alignItems: "center",
    display: "flex",
    gridColumn: "1 / 3",
    margin: "-4px",
    "& > *": {
      margin: "4px",
    },
  },
});

interface TopArticleItemProps {
  article: Article;
  userArticle: UserArticle;
}

const TopArticleItem: React.FC<TopArticleItemProps> = ({
  article,
  userArticle,
}) => {
  const { displayName, manufacturer, photoURL } = article.data;
  const { checkIns, rating } = userArticle.data;

  const classes = useStyles();

  return (
    <ImageItem image={photoURL && <img src={photoURL} alt={displayName} />}>
      <div className={classes.displayName}>{displayName}</div>
      <div className={classes.manufacturer}>{manufacturer}</div>
      <div className={classes.checkIns}>{checkIns} check ins</div>
      <div className={classes.rating}>
        {rating && <Rating rating={rating / 5} />}
      </div>
    </ImageItem>
  );
};

export default TopArticleItem;
