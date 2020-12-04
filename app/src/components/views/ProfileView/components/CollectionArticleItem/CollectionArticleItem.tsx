import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import CollectionItem from "components/ui/layout/CollectionItem/CollectionItem";

const useStyles = makeStyles({
  content: {
    padding: "24px 0",
    textAlign: "center",
  },
  displayName: {
    color: "#1b2230",
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  manufacturer: {
    color: "#727985",
    fontSize: "12px",
    fontWeight: 500,
  },
});

interface CollectionArticleItemProps {
  article: Article;
}

const CollectionArticleItem: React.FC<CollectionArticleItemProps> = ({
  article,
}) => {
  const { displayName, manufacturer, photoURL } = article;

  const classes = useStyles();

  return (
    <CollectionItem imageURL={photoURL}>
      <div className={classes.content}>
        <div className={classes.displayName}>{displayName}</div>
        <div className={classes.manufacturer}>{manufacturer}</div>
      </div>
    </CollectionItem>
  );
};

export default CollectionArticleItem;
