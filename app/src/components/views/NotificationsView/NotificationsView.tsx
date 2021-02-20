import React, { useEffect } from "react";
import { Nav } from "components/ui/layout/NavigationBar";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import ItemList from "components/ui/layout/ItemList";
import { useNotifications } from "components/hooks/db/useNotifications";
import NotificationItemButton from "components/fragments/Notification/NotificationItem/Button";
import HeaderPageLayout from "components/ui/layout/HeaderPageLayout";

interface NotificationsViewProps {
  nav: Nav;
  routes: {
    checkIn: (checkInId: string) => void;
  };
  userId: string;
}

const NotificationsView: React.FC<NotificationsViewProps> = ({
  nav,
  routes,
  userId,
}) => {
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

  return (
    <ThemeProvider theme="pure">
      <HeaderPageLayout nav={nav} title="Notifications">
        <ItemList divided>
          {notifications &&
            notifications.map((notification) => {
              return (
                <NotificationItemButton
                  key={notification.id}
                  userId={userId}
                  routes={routes}
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
