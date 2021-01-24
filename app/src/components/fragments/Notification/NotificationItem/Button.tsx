import React from "react";
import NotificationItem from "./NotificationItem";
import { Notification } from "types/Notification";

interface NotificationItemButtonProps {
  userId: string;
  notification: Notification;
  routes: {
    checkIn: (checkInId: string) => void;
  };
}

const NotificationItemButton: React.FC<NotificationItemButtonProps> = React.memo(
  ({ userId, notification, routes }) => {
    return (
      <button onClick={() => routes.checkIn(notification.type.checkInId)}>
        <NotificationItem userId={userId} notification={notification} />
      </button>
    );
  }
);

export default NotificationItemButton;
