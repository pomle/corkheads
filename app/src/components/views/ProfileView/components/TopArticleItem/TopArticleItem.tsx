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
  const { data } = article;
  const { photoURL } = data;

  const classes = useStyles();

  return (
    <ImageItem
      image={photoURL && <img src={photoURL} alt={data.displayName} />}
    >
      <div className={classes.displayName}>{article.data.displayName}</div>
      <div className={classes.manufacturer}>{article.data.manufacturer}</div>
      <div className={classes.checkIns}>
        {userArticle.data.checkIns} check ins
      </div>
      <div className={classes.rating}>
        {userArticle.data.rating && <Rating rating={userArticle.data.rating} />}
      </div>
    </ImageItem>
  );
};

export default TopArticleItem;
