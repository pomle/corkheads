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
import ArticleImagePlaceholder from "assets/graphics/drink-placeholder.svg";
import { ReactComponent as LikeIcon } from "assets/graphics/icons/reaction-active-like.svg";

const useStyles = makeStyles((theme: Theme) => ({
  CheckInItem: {
    display: "grid",
    gridGap: "4px",
    gridTemplateRows: "repeat(4, auto)",
    minHeight: "100%",
    "& .displayName": {
      color: theme.color.title,
      fontSize: "14px",
      fontWeight: 700,
      gridArea: "2 / 1 / 3 / 2",
    },
    "& .comment": {
      color: theme.color.text,
      fontSize: "14px",
      fontWeight: 400,
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
      display: "none",
      gridArea: "1 / 2 / 5 / 3",
      justifySelf: "end",
      paddingLeft: "8px",
      "@media (min-width: 360px)": {
        display: "initial",
      },
    },
    "& .interactions": {
      alignItems: "center",
      border: `1px solid ${Colors.Sky}`,
      borderRadius: "16px",
      color: () => {
        if (theme.color.surface === Colors.White) {
          return Colors.Sot;
        }
        return theme.color.text;
      },
      display: "flex",
      fontSize: "10px",
      width: "fit-content",
      "& .comments": {
        borderRight: `1px solid ${Colors.Sky}`,
        padding: "2px 8px",
      },
      "& .reactions": {
        alignItems: "center",
        display: "flex",
        padding: "2px 8px",
        "& svg": {
          display: "block",
          height: "18px",
          margin: "-2px 0",
          width: "18px",
        },
      },
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
    <ImageItem
      imageId={imageId}
      placeholderURL={ArticleImagePlaceholder}
      size={96}
    >
      <div className={classes.CheckInItem}>
        <div className="meta">
          <div className="user">
            <UserHandle user={user} />
          </div>
          &ensp;•&ensp;
          <div className="timestamp">
            {timestamp && <PassedTime date={timestamp} />}
          </div>
          &ensp;•&ensp;
          <div className="rating">
            <ItemRating rating={rating} />
          </div>
        </div>
        <div className="displayName">{articleDisplayName}</div>

        <blockquote className="comment">{checkIn.comment}</blockquote>

        <div className="interactions">
          <div className="comments">{checkIn.commentCount} comments</div>
          <div className="reactions">
            {checkIn.reactionCount} &nbsp; <LikeIcon />
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
