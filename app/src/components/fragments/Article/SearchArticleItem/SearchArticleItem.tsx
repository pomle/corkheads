import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { SearchResult } from "components/hooks/db/useArticleSearch";

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
  searchResult: SearchResult;
}

const SearchArticleItem: React.FC<SearchArticleItemProps> = ({
  searchResult,
}) => {
  const {
    entry: { data: article },
  } = searchResult;
  const { displayName, photoURL, ratingAggregate } = article;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <div></div>
      <ItemRating aggregate={ratingAggregate} />
    </ImageItem>
  );
};

export default SearchArticleItem;
