import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.action,
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
  },
  meta: {
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
    gridColumn: "1 / 3",
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
  checkIn: CheckIn;
  article: Article;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ checkIn, article }) => {
  const photoURL = resolvePhotoURL(checkIn, article);

  const { displayName } = article;
  const { rating, timestamp } = checkIn;

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{displayName}</div>
      <blockquote className={classes.meta}>{checkIn.comment}</blockquote>
      <div className={classes.timestamp}>
        {timestamp && <PassedTime date={timestamp} />}
      </div>
      <div className={classes.rating}>
        <ItemRating rating={rating} />
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
