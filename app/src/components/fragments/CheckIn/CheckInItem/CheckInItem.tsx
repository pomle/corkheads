import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article, createArticle } from "types/Article";
import { CheckIn, createCheckIn } from "types/CheckIn";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import ItemRating from "components/fragments/Rating/ItemRating";
import { useUser } from "components/hooks/db/useUsers";
import { createUser } from "types/User";
import { useUserArticle } from "components/hooks/db/useUserArticles";
import Badge from "components/ui/icons/Badge";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { useArticle } from "components/hooks/db/useArticles";
import { createUserArticle } from "types/UserArticle";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";
import UserHandle from "components/fragments/User/UserHandle";

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

interface CheckInItemProps {
  pointer: CheckInPointer;
}

const CheckInItem: React.FC<CheckInItemProps> = ({
  pointer: { checkInId, userId, articleId },
}) => {
  const article = useArticle(articleId)?.data || createArticle(articleId);
  const checkIn = useCheckIn(checkInId)?.data || createCheckIn(checkInId);
  const user = useUser(userId)?.data || createUser(userId);
  const userArticle =
    useUserArticle(userId, articleId)?.data || createUserArticle(articleId);

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
        <UserHandle user={user} />
      </div>
      <div className={classes.badge}>
        <Badge type={resolveBadgeType(checkInCount)}>{checkInCount}</Badge>
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
