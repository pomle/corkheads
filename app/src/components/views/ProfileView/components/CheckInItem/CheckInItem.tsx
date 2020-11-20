import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/article";
import { CheckIn } from "types/checkIn";
import Rating from "components/ui/indicators/Rating";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";

const useStyles = makeStyles({
  displayName: {
    fontSize: "17px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  manufacturer: {
    fontSize: "12px",
    fontWeight: 500,
  },
  timestamp: {
    color: "#e2e2e2",
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
});

function resolvePhotoURL(checkIn: CheckIn, article: Article) {
  if (checkIn.data.photoURL) {
    return checkIn.data.photoURL;
  }

  if (article.data.photoURL) {
    return article.data.photoURL;
  }

  return;
}

interface CheckInItemProps {
  article: Article;
  checkIn: CheckIn;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ checkIn, article }) => {
  const photoURL = resolvePhotoURL(checkIn, article);

  const { displayName, manufacturer } = article.data;
  const { rating, loveIt, timestamp } = checkIn.data;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <div className={classes.manufacturer}>{manufacturer}</div>
      <div className={classes.timestamp}>
        {timestamp && <PassedTime date={timestamp} />}
      </div>
      <div className={classes.rating}>
        {loveIt && <span>💖</span>}
        {rating && <Rating rating={rating / 5} />}
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
