import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import { Colors } from "components/ui/theme/themes";
import CollectionItem from "components/ui/layout/CollectionItem/CollectionItem";

const useStyles = makeStyles({
  content: {
    padding: "16px",
    textAlign: "center",
  },
  displayName: {
    color: Colors.Navy,
    fontSize: "14px",
    fontWeight: 700,
  },
  subText: {
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
  const { displayName, photoURL } = article;

  const classes = useStyles();

  return (
    <CollectionItem imageURL={photoURL}>
      <div className={classes.content}>
        <div className={classes.displayName}>{displayName}</div>
      </div>
    </CollectionItem>
  );
};

export default CollectionArticleItem;
