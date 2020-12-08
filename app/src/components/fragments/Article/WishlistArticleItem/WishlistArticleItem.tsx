import React from "react";
import { makeStyles } from "@material-ui/styles";
import Photo from "components/ui/layout/Photo";
import { Article } from "types/Article";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  WishlistItem: {
    alignItems: "center",
    borderRadius: "16px",
    boxShadow: "0 1px 4px #e7e8e9",
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "64px auto",
    gridGap: "16px",
    padding: "4px",
  },
  photo: {
    borderRadius: "12px",
    overflow: "hidden",
    height: "64px",
    width: "64px",
  },
  displayName: {
    color: "#1b2230",
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  subText: {
    color: "#727985",
    fontSize: "12px",
    fontWeight: 500,
  },
  content: {},
}));

interface WishlistArticleItemProps {
  article: Article;
}

const WishlistArticleItem: React.FC<WishlistArticleItemProps> = ({
  article,
}) => {
  const { displayName, photoURL } = article;

  const classes = useStyles();

  return (
    <div className={classes.WishlistItem}>
      <div className={classes.photo}>
        <Photo url={photoURL} />
      </div>
      <div className={classes.content}>
        <div className={classes.displayName}>{displayName}</div>
        <div></div>
      </div>
    </div>
  );
};

export default WishlistArticleItem;
