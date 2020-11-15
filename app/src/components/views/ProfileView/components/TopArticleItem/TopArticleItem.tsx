import React from "react";
import { makeStyles } from "@material-ui/styles";
import Badge from "components/ui/typography/Badge";
import { UserArticle } from "types/userArticle";
import { Article } from "types/article";

type StyleProps = {
  photoURL?: string;
};

function backgroundImage({ photoURL }: StyleProps) {
  if (photoURL) {
    return `url(${photoURL})`;
  }
  return "none";
}

const useStyles = makeStyles({
  TopArticleItem: {
    display: "flex",
  },
  photo: {
    background: "#c9c9c9",
    backgroundImage,
    backgroundPosition: "center",
    backgroundSize: "cover",
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

interface TopArticleItemProps {
  article: Article;
  userArticle: UserArticle;
}

const TopArticleItem: React.FC<TopArticleItemProps> = ({
  article,
  userArticle,
}) => {
  const classes = useStyles({ photoURL: article.data.photoURL });

  return (
    <div className={classes.TopArticleItem}>
      <div className={classes.photo} />
      <div className={classes.meta}>
        <div>
          <div className={classes.displayName}>{article.data.displayName}</div>
          <div className={classes.manufacturer}>
            {article.data.manufacturer}
          </div>
        </div>
        <div>
          <Badge>{userArticle.data.checkIns} Check-Ins</Badge>
        </div>
      </div>
    </div>
  );
};

export default TopArticleItem;
