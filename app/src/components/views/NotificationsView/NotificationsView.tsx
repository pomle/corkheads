import React, { useEffect } from "react";
import HeaderLayout from "components/ui/layout/HeaderLayout";
import ViewCap from "components/ui/layout/ViewCap";
import ViewBody from "components/ui/layout/ViewBody";
import { makeStyles } from "@material-ui/styles";
import ThemeProvider from "components/ui/theme/ThemeProvider";
import { Theme } from "components/ui/theme/themes";
import ViewTitle from "components/ui/layout/ViewTitle";
import ItemList from "components/ui/layout/ItemList";
import { useNotifications } from "components/hooks/db/useNotifications";
import NotificationItemButton from "components/fragments/Notification/NotificationItem/Button";

const useStyles = makeStyles((theme: Theme) => ({
  body: {
    margin: "16px",
  },
}));

interface NotificationsViewProps {
  nav: React.ReactNode;
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

  const classes = useStyles();

  return (
    <ThemeProvider theme="pure">
      <HeaderLayout>
        <ViewCap>
          {nav}
          <ViewTitle title="Notifications" />
        </ViewCap>
        <ViewBody>
          <div className={classes.body}>
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
          </div>
        </ViewBody>
      </HeaderLayout>
    </ThemeProvider>
  );
};

export default NotificationsView;
