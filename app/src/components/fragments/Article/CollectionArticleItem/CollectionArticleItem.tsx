import React from "react";
import { makeStyles } from "@material-ui/styles";
import { createArticle } from "types/Article";
import CollectionItem from "components/ui/layout/CollectionItem/CollectionItem";
import { useArticle } from "components/hooks/db/useArticles";
import { Theme } from "components/ui/theme/themes";
import BottlingMeta from "components/fragments/Bottling/BottlingMeta";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import { createUserArticle } from "types/UserArticle";
import PassedTime from "components/ui/format/PassedTime";

const useStyles = makeStyles((theme: Theme) => ({
  CollectionArticleItem: {
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "4px",
    padding: "16px",
    textAlign: "center",
    "& .displayName": {
      color: theme.color.action,
      fontSize: "14px",
      fontWeight: 700,
    },
    "& .meta": {
      fontSize: "10px",
      fontWeight: 500,
    },
    "& .date": {
      fontSize: "7px",
      fontWeight: 400,
    },
  },
}));

interface CollectionArticleItemProps {
  pointer: { articleId: string; userId: string };
}

const CollectionArticleItem: React.FC<CollectionArticleItemProps> = ({
  pointer: { articleId, userId },
}) => {
  const article = useArticle(articleId)?.data || createArticle(articleId);
  const userArticle =
    useUserArticle(userId, articleId)?.data || createUserArticle(articleId);

  const { displayName, photoURL } = article;

  const addedDate = userArticle.collection?.addedTimestamp;

  const classes = useStyles();

  return (
    <CollectionItem imageURL={photoURL}>
      <div className={classes.CollectionArticleItem}>
        <div className="displayName">{displayName}</div>
        {article.bottling && (
          <div className="meta">
            <BottlingMeta bottling={article.bottling} />
          </div>
        )}
        {addedDate && (
          <div className="date">
            In collection since <PassedTime date={addedDate} />
          </div>
        )}
      </div>
    </CollectionItem>
  );
};

export default CollectionArticleItem;
