import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import { CheckIn } from "types/CheckIn";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";
import { Colors, Theme } from "components/ui/theme/themes";
import ItemRating from "components/fragments/Rating/ItemRating";
import { useUser } from "components/hooks/db/useUsers";
import { User } from "types/User";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.action,
    fontSize: "14px",
    fontWeight: 700,
    gridArea: "1 / 1 / 2 / 2",
  },
  meta: {
    color: theme.color.text,
    fontSize: "12px",
    fontWeight: 500,
  },
  checkInMeta: {
    alignItems: "center",
    color: Colors.X2,
    display: "flex",
    fontSize: "10px",
    gap: "8px",
    gridArea: "3 / 1 / 4 / 2",
  },
  username: {
    color: Colors.X1,
  },
  timestamp: {
    color: Colors.X1,
  },
  rating: {},
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

function resolveUserDisplayName(user?: User) {
  if (user) {
    if (user.username) {
      return `@${user.username}`;
    }
    if (user.profile?.displayName) {
      return user.profile.displayName;
    }
  }
  return "• • •";
}

interface CheckInItemProps {
  checkIn: CheckIn;
  article: Article;
}

const CheckInItem: React.FC<CheckInItemProps> = ({ checkIn, article }) => {
  const user = useUser(checkIn.userId)?.data;

  const userDisplayName = resolveUserDisplayName(user);

  const { displayName: articleDisplayName } = article;
  const { rating, timestamp } = checkIn;

  const photoURL = resolvePhotoURL(checkIn, article);

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{articleDisplayName}</div>
      <blockquote className={classes.meta}>{checkIn.comment}</blockquote>
      <div className={classes.checkInMeta}>
        <div className={classes.rating}>
          <ItemRating rating={rating} />
        </div>
        {" – "}
        <div className={classes.timestamp}>
          {timestamp && <PassedTime date={timestamp} />}
        </div>
        {" – "}
        <div className={classes.username}>{userDisplayName}</div>
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
