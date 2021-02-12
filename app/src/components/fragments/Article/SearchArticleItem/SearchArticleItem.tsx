import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { ArticleHit } from "components/hooks/db/useOmniSearch";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";
import ArticleImagePlaceholder from "assets/graphics/drink-placeholder.svg";

const useStyles = makeStyles((theme: Theme) => ({
  SearchArticleItem: {
    display: "grid",
    gridAutoFlow: "rows",
    gridGap: "4px",
    "& .displayName": {
      color: theme.color.accent,
      fontSize: "14px",
    },
    "& .meta": {
      color: theme.color.text,
      fontSize: "12px",
    },
  },
}));

interface SearchArticleItemProps {
  userId: string;
  result: ArticleHit;
}

const SearchArticleItem: React.FC<SearchArticleItemProps> = ({
  userId,
  result: { articleId },
}) => {
  const article = useUserVirtualArticle(userId, articleId);

  const { displayName, imageId, ratingAggregate } = article;

  const classes = useStyles();

  return (
    <ImageItem imageId={imageId} placeholderURL={ArticleImagePlaceholder}>
      <div className={classes.SearchArticleItem}>
        <div className="displayName">{displayName}</div>
        <div className="meta">
          {article.bottling && <BottlingMeta bottling={article.bottling} />}
        </div>
        <ItemRating aggregate={ratingAggregate} />
      </div>
    </ImageItem>
  );
};

export default SearchArticleItem;
