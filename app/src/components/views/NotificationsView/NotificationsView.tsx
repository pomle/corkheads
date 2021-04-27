import React, { useEffect } from "react";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ItemList from "components/ui/layout/ItemList";
import { useNotifications } from "components/hooks/db/useNotifications";
import NotificationItemButton from "components/fragments/Notification/NotificationItem/Button";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";
import BackButton from "components/ui/trigger/BackButton";
import { useBack } from "components/context/ScreenContext";

interface NotificationsViewProps {
  userId: string;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({ userId }) => {
  const { notifications, markSeen } = useNotifications(userId);

  useEffect(() => {
    if (!notifications) {
      return;
    }

    const unseen = notifications.filter((n) => !n.seen);
    if (unseen.length > 0) {
      markSeen(unseen);
    }
  }, [notifications, markSeen]);

  const goBack = useBack();

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout
        nav={{ back: <BackButton onClick={goBack} /> }}
        title="Notifications"
      >
        <ItemList divided>
          {notifications &&
            notifications.map((notification) => {
              return (
                <NotificationItemButton
                  key={notification.id}
                  userId={userId}
                  notification={notification}
                />
              );
            })}
        </ItemList>
      </HeaderPageLayout>
    </ThemeProvider>
  );
};

export default NotificationsView;
