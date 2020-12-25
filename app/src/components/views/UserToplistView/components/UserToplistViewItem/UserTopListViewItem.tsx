import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import { UserArticle } from "types/UserArticle";
import { Theme } from "components/ui/theme/themes";
import TopArticleItem from "components/fragments/Article/TopArticleItem";

const useStyles = makeStyles((theme: Theme) => ({
  UserToplistViewItem: {
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

interface UserToplistViewItemProps {
  article: Article;
  userArticle: UserArticle;
  rank: React.ReactNode;
  routes: {
    article: (articleId: string) => void;
  };
}

const UserToplistViewItem: React.FC<UserToplistViewItemProps> = ({
  rank,
  article,
  userArticle,
  routes,
}) => {
  const classes = useStyles();

  return (
    <button
      key={article.id}
      className={classes.UserToplistViewItem}
      onClick={() => routes.article(article.id)}
    >
      <div className="rank">{rank}</div>
      <TopArticleItem article={article} userArticle={userArticle} />
    </button>
  );
};

export default UserToplistViewItem;
