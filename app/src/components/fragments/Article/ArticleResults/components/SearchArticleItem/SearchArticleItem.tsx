import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.action,
    fontSize: "14px",
  },
  meta: {
    color: theme.color.text,
    fontSize: "12px",
  },
}));

interface SearchArticleItemProps {
  article: Article;
}

const SearchArticleItem: React.FC<SearchArticleItemProps> = ({ article }) => {
  const { displayName, manufacturer, photoURL } = article;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <div className={classes.meta}>{manufacturer}</div>
    </ImageItem>
  );
};

export default SearchArticleItem;
