import React from "react";
import NotificationItem from "./NotificationItem";
import { Notification } from "types/Notification";
import { useCheckInRoute } from "components/route/paths";

interface NotificationItemButtonProps {
  userId: string;
  notification: Notification;
}

const NotificationItemButton: React.FC<NotificationItemButtonProps> = React.memo(
  ({ userId, notification }) => {
    const goToCheckIn = useCheckInRoute();

    return (
      <button onClick={() => goToCheckIn(notification.type.checkInId)}>
        <NotificationItem userId={userId} notification={notification} />
      </button>
    );
  }
);

export default NotificationItemButton;
