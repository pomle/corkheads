import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import { Article } from "types/Article";

const useStyles = makeStyles((theme: Theme) => ({
  PreviewArticleItem: {
    display: "grid",
    gridAutoFlow: "rows",
    gridGap: "2px",
    "& .displayName": {
      color: theme.color.accent,
      fontSize: "14px",
      lineHeight: 1.25,
    },
    "& .meta": {
      color: theme.color.text,
      fontSize: "12px",
    },
  },
}));

interface PreviewArticleItemProps {
  article: Article;
}

const PreviewArticleItem: React.FC<PreviewArticleItemProps> = ({ article }) => {
  const { displayName, photoURL, ratingAggregate } = article;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.PreviewArticleItem}>
        <div className="displayName">{displayName}</div>
        <div className="meta">
          {article.bottling && <BottlingMeta bottling={article.bottling} />}
        </div>
        <ItemRating aggregate={ratingAggregate} />
      </div>
    </ImageItem>
  );
};

export default PreviewArticleItem;
