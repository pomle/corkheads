import React from "react";
import { makeStyles } from "@material-ui/styles";
import { createArticle } from "types/Article";
import { Colors } from "components/ui/theme/colors";
import CollectionItem from "components/ui/layout/CollectionItem/CollectionItem";
import { useArticle } from "components/hooks/db/useArticles";

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
  pointer: { articleId: string; userId: string };
}

const CollectionArticleItem: React.FC<CollectionArticleItemProps> = ({
  pointer: { articleId },
}) => {
  const article = useArticle(articleId)?.data || createArticle(articleId);

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
