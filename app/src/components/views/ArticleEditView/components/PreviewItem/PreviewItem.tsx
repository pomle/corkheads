import React from "react";
import { makeStyles } from "@material-ui/styles";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import BottlingMeta from "./components/BottlingMeta";
import { Article } from "types/Article";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.accent,
    fontSize: "14px",
    lineHeight: 1.25,
  },
  meta: {
    color: theme.color.text,
    fontSize: "12px",
  },
}));

interface PreviewItemProps {
  article: Article;
}

const PreviewItem: React.FC<PreviewItemProps> = ({ article }) => {
  const { displayName, photoURL, ratingAggregate } = article;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <div className={classes.meta}>
        {article.bottling && <BottlingMeta bottling={article.bottling} />}
      </div>
      <ItemRating aggregate={ratingAggregate} />
    </ImageItem>
  );
};

export default PreviewItem;
