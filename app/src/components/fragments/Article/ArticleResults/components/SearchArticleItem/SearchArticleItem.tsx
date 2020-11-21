import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import ImageItem from "components/ui/layout/ImageItem";
import { Container } from "types/types";

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

interface SearchArticleItemProps {
  article: Container<Article>;
}

const SearchArticleItem: React.FC<SearchArticleItemProps> = ({ article }) => {
  const { photoURL } = article.data;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{article.data.displayName}</div>
      <div className={classes.manufacturer}>{article.data.manufacturer}</div>
    </ImageItem>
  );
};

export default SearchArticleItem;
