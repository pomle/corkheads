import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import TopArticleItem from "components/fragments/Article/TopArticleItem";
import { UserArticlePointer } from "components/hooks/db/useUserArticleQuery";

const useStyles = makeStyles((theme: Theme) => ({
  RankedTopArticleItem: {
    alignItems: "center",
    display: "flex",
    "& .rank": {
      color: theme.color.title,
      flex: "0 16px",
      fontFamily: "Bree Serif",
      fontSize: "16px",
      marginRight: "16px",
      textAlign: "right",
    },
    "& > :last-child": {
      flex: 1,
    },
  },
}));

interface RankedTopArticleItemProps {
  pointer: UserArticlePointer;
  rank: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
  };
}

const RankedTopArticleItem: React.FC<RankedTopArticleItemProps> = React.memo(
  ({ pointer, rank, routes }) => {
    const classes = useStyles();

    return (
      <button
        key={pointer.articleId}
        className={classes.RankedTopArticleItem}
        onClick={() => routes.article(pointer.articleId)}
      >
        <div className="rank">{rank}</div>
        <TopArticleItem pointer={pointer} />
      </button>
    );
  }
);

export default RankedTopArticleItem;
