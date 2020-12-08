import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import Score from "components/ui/indicators/Score";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.action,
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  subText: {
    color: theme.color.text,
    fontSize: "12px",
    fontWeight: 500,
  },
  timestamp: {
    color: theme.color.text + "60",
    fontSize: "10px",
    textAlign: "right",
  },
  rating: {
    alignItems: "center",
    display: "flex",
    fontSize: "10px",
    gridColumn: "1 / 3",
    margin: "-4px",
    "& > *": {
      margin: "4px",
    },
  },
}));

function resolvePhotoURL(checkIn: CheckIn, article: Article) {
  if (checkIn.photoURL) {
    return checkIn.photoURL;
  }

  if (article.photoURL) {
    return article.photoURL;
  }

  return;
}

interface CheckInItemProps {
  article: Article;
  checkIn: CheckIn;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ checkIn, article }) => {
  const photoURL = resolvePhotoURL(checkIn, article);

  const { displayName } = article;
  const { rating, timestamp } = checkIn;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <div></div>
      <div className={classes.timestamp}>
        {timestamp && <PassedTime date={timestamp} />}
      </div>
      <div className={classes.rating}>
        {rating.love && <span>💖</span>}
        {rating?.score && <Score score={rating.score} />}
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
