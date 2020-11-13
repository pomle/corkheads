import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/types";

const useStyles = makeStyles({
  ArticleItem: {
    display: "flex",
  },
  photo: {
    background: "#c9c9c9",
    overflow: "hidden",
    height: "85px",
    width: "85px",
  },
  meta: {
    background: "#fff",
    color: "#5a5a5a",
    display: "grid",
    gridAutoFlow: "row",
    gridGap: "4px",
    flex: "1",
    lineHeight: 1.4,
    padding: "14px 16px",
  },
  displayName: {
    fontSize: "17px",
    fontWeight: 700,
  },
  manufacturer: {
    fontSize: "12px",
    fontWeight: 500,
  },
});

interface ArticleItemProps {
  article: Article;
}

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const classes = useStyles();
  return (
    <div className={classes.ArticleItem}>
      <div className={classes.photo}></div>
      <div className={classes.meta}>
        <div>
          <div className={classes.displayName}>{article.data.displayName}</div>
          <div className={classes.manufacturer}>
            {article.data.manufacturer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleItem;
