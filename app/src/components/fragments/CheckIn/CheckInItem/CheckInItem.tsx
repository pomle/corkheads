import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Article } from "types/Article";
import { CheckIn, createCheckIn } from "types/CheckIn";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import ItemRating from "components/fragments/Rating/ItemRating";
import { useUser } from "components/hooks/db/useUsers";
import { createUser } from "types/User";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";
import UserHandle from "components/fragments/User/UserHandle";
import CheckInCountBadge from "components/fragments/CheckIn/CheckInCountBadge";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";

const useStyles = makeStyles((theme: Theme) => ({
  CheckInItem: {
    display: "grid",
    gridGap: "2px",
    "& .displayName": {
      color: theme.color.title,
      fontSize: "14px",
      fontWeight: 700,
      gridArea: "1 / 1 / 2 / 2",
    },
    "& .comment": {
      color: theme.color.text,
      fontSize: "12px",
      fontWeight: 500,
    },
    "& .meta": {
      alignItems: "center",
      color: () => {
        if (theme.color.surface === Colors.White) {
          return Colors.Sot;
        }
        return theme.color.text;
      },
      display: "flex",
      fontSize: "10px",
    },
    "& .badge": {
      alignSelf: "center",
      gridArea: "1 / 2 / 4 / 3",
      justifySelf: "end",
      paddingLeft: "8px",
    },
  },
}));

function resolveImageId(checkIn: CheckIn, article: Article) {
  if (checkIn.imageId) {
    return checkIn.imageId;
  }

  if (article.imageId) {
    return article.imageId;
  }

  return;
}

interface CheckInItemProps {
  pointer: CheckInPointer;
}

const CheckInItem: React.FC<CheckInItemProps> = ({
  pointer: { checkInId, userId, articleId },
}) => {
  const article = useUserVirtualArticle(userId, articleId);
  const checkIn = useCheckIn(checkInId)?.data || createCheckIn(checkInId);
  const user = useUser(userId)?.data || createUser(userId);

  const { displayName: articleDisplayName } = article;
  const { rating, timestamp } = checkIn;

  const checkInCount = article?.checkIns;

  const imageId = resolveImageId(checkIn, article);

  const classes = useStyles();

  return (
    <ImageItem imageId={imageId}>
      <div className={classes.CheckInItem}>
        <div className="displayName">{articleDisplayName}</div>
        {checkIn.comment && (
          <blockquote className="comment">{checkIn.comment}</blockquote>
        )}
        <div className="meta">
          <div className="rating">
            <ItemRating rating={rating} />
          </div>
          &ensp;•&ensp;
          <div className="timestamp">
            {timestamp && <PassedTime date={timestamp} />}
          </div>
          &ensp;•&ensp;
          <div className="user">
            <UserHandle user={user} />
          </div>
        </div>
        <div className="badge">
          <CheckInCountBadge count={checkInCount} />
        </div>
      </div>
    </ImageItem>
  );
};

export default CheckInItem;
