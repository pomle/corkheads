import React from "react";
import { makeStyles } from "@material-ui/styles";
import Badge from "components/ui/typography/Badge";
import { UserArticle } from "types/userArticle";
import { Article } from "types/article";
import ImageItem from "components/ui/layout/ImageItem";

const useStyles = makeStyles({
  displayName: {
    fontSize: "17px",
    fontWeight: 700,
  },
  manufacturer: {
    fontSize: "12px",
    fontWeight: 500,
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
      <div>
        <Badge>{userArticle.data.checkIns} Check-Ins</Badge>
      </div>
    </ImageItem>
  );
};

export default TopArticleItem;
