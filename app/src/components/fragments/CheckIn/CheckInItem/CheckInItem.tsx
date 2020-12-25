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
import { useUserArticle } from "components/hooks/db/useUserArticles";
import Badge from "components/ui/icons/Badge";

const useStyles = makeStyles((theme: Theme) => ({
  displayName: {
    color: theme.color.title,
    fontSize: "14px",
    fontWeight: 700,
    gridArea: "1 / 1 / 2 / 2",
  },
  comment: {
    color: theme.color.accent,
    fontSize: "12px",
    fontWeight: 500,
    margin: 0,
    padding: 0,
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
  badge: {
    alignSelf: "center",
    gridArea: "1 / 2 / 4 / 3",
    justifySelf: "end",
    paddingLeft: "8px",
  },
}));

function resolveBadgeType(count?: number) {
  if (count) {
    if (count > 10) {
      return "heart";
    } else if (count > 5) {
      return "diamond";
    }
  }
  return "badge";
}

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
  const userArticle = useUserArticle(checkIn.userId, checkIn.articleId)?.data;

  const userDisplayName = resolveUserDisplayName(user);

  const { displayName: articleDisplayName } = article;
  const { rating, timestamp } = checkIn;

  const checkInCount = userArticle?.checkIns;

  const photoURL = resolvePhotoURL(checkIn, article);

  const classes = useStyles();

  return (
    <ImageItem imageURL={photoURL}>
      <div className={classes.displayName}>{articleDisplayName}</div>
      {checkIn.comment && (
        <blockquote className={classes.comment}>{checkIn.comment}</blockquote>
      )}
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
      <div className={classes.badge}>
        <Badge type={resolveBadgeType(checkInCount)}>{checkInCount}</Badge>
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
