import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Notification } from "types/Notification";
import PassedTime from "components/ui/format/PassedTime";
import { Theme } from "components/ui/theme/themes";
import { useUser } from "components/hooks/db/useUsers";
import { createUser } from "types/User";
import RoundedImageItem from "components/ui/layout/RoundedImageItem";
import ActionDescription from "./components/ActionDescription";
import NotificationPreview from "./components/Preview";

const useStyles = makeStyles((theme: Theme) => ({
  NotificationItem: {
    display: "grid",
    gridGap: "8px",
    "& .description": {
      fontSize: "12px",
    },
  },
}));

function findAuthorUserId(notification: Notification) {
  return notification.type?.authorUserId;
}

interface NotificationItemProps {
  userId: string;
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  userId,
  notification,
}) => {
  const authorUserId = findAuthorUserId(notification);

  const user = useUser(authorUserId)?.data || createUser(authorUserId);

  const { timestamp } = notification;

  const classes = useStyles();

  return (
    <RoundedImageItem imageId={user.profile?.imageId}>
      <div className={classes.NotificationItem}>
        <div className="description">
          <ActionDescription user={user} notification={notification} />
          &ensp;•&ensp;
          {timestamp && <PassedTime date={timestamp} />}
        </div>
        <div className="preview">
          <NotificationPreview userId={userId} notification={notification} />
        </div>
      </div>
    </RoundedImageItem>
  );
};

export default NotificationItem;
