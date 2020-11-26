import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
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

interface SearchArticleItemProps {
  article: Article;
}

const SearchArticleItem: React.FC<SearchArticleItemProps> = ({ article }) => {
  const { displayName, manufacturer, photoURL } = article;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <div className={classes.manufacturer}>{manufacturer}</div>
    </ImageItem>
  );
};

export default SearchArticleItem;
