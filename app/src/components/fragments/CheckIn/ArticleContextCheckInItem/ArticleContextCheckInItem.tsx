import React from "react";
import { makeStyles } from "@material-ui/styles";
import { CheckIn, createCheckIn } from "types/CheckIn";
import PassedTime from "components/ui/format/PassedTime";
import ImageItem from "components/ui/layout/ImageItem";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import ItemRating from "components/fragments/Rating/ItemRating";
import { useUser } from "components/hooks/db/useUsers";
import { createUser, User } from "types/User";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { CheckInPointer } from "components/hooks/db/useCheckInQuery";
import UserHandle from "components/fragments/User/UserHandle";

const useStyles = makeStyles((theme: Theme) => ({
  ArticleContextCheckInItem: {
    display: "grid",
    gridGap: "2px",
    "& .user": {
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
  },
}));

function resolveImageId(checkIn: CheckIn, user: User) {
  if (checkIn.imageId) {
    return checkIn.imageId;
  }

  if (user?.profile?.imageId) {
    return user.profile.imageId;
  }

  return;
}

interface ArticleContextCheckInItemProps {
  pointer: CheckInPointer;
}

const ArticleContextCheckInItem: React.FC<ArticleContextCheckInItemProps> = ({
  pointer: { checkInId, userId },
}) => {
  const checkIn = useCheckIn(checkInId)?.data || createCheckIn(checkInId);
  const user = useUser(userId)?.data || createUser(userId);

  const { rating, timestamp } = checkIn;

  const imageId = resolveImageId(checkIn, user);

  const classes = useStyles();

  return (
    <ImageItem imageId={imageId}>
      <div className={classes.ArticleContextCheckInItem}>
        <div className="user">
          <UserHandle user={user} />
        </div>
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
        </div>
      </div>
    </ImageItem>
  );
};

export default ArticleContextCheckInItem;
