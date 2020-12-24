import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { SearchResult } from "components/hooks/db/useArticleSearch";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import Highlighted from "./components/Highlighted";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.accent,
    fontSize: "14px",
    lineHeight: 1.25,
    "& em": {
      color: theme.color.action,
      fontStyle: "normal",
    },
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
    hit,
    entry: { data: article },
  } = searchResult;
  const { displayName, photoURL, ratingAggregate } = article;
  const displayNameMatch = hit.matches?.displayName?.value;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>
        {displayNameMatch ? (
          <Highlighted text={displayNameMatch} />
        ) : (
          displayName
        )}
      </div>
      <div className={classes.meta}>
        {article.bottling && <BottlingMeta bottling={article.bottling} />}
      </div>
      <ItemRating aggregate={ratingAggregate} />
    </ImageItem>
  );
};

export default SearchArticleItem;
