import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { SearchResult } from "components/hooks/db/useArticleSearch";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import Highlighted from "./components/Highlighted";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";

function color(theme: Theme) {
  return theme.color.accent;
}

function highlightColor(theme: Theme) {
  return theme.color.action;
}

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: color(theme),
    fontSize: "14px",
    lineHeight: 1.25,
    "& em": {
      color: highlightColor(theme),
      fontStyle: "normal",
    },
  },
  meta: {
    color: theme.color.text,
    fontSize: "12px",
  },
}));

interface SearchArticleItemProps {
  userId: string;
  result: SearchResult;
}

const SearchArticleItem: React.FC<SearchArticleItemProps> = ({
  userId,
  result: { articleId, matches },
}) => {
  const article = useUserVirtualArticle(userId, articleId);

  const { displayName, photoURL, ratingAggregate } = article;
  const displayNameMatch = matches?.displayName?.value;

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
