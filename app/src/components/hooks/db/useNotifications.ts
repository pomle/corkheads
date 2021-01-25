import { useCallback, useEffect, useMemo, useState } from "react";
import { toMoment } from "types/convert";
import { Notification } from "types/Notification";
import { useDB } from "../useDB";

export function useNotifications(userId: string) {
  const db = useDB();

  const [notifications, setNotifications] = useState<Notification[]>();

  const notificationsRef = useMemo(() => {
    return db.collection("users").doc(userId).collection("notifications");
  }, [db, userId]);

  const markSeen = useCallback(
    (notifications: Notification[]) => {
      return Promise.all(
        notifications.map((notification) => {
          return notificationsRef.doc(notification.id).update({ seen: true });
        })
      );
    },
    [notificationsRef]
  );

  useEffect(() => {
    return notificationsRef
      .orderBy("timestamp", "desc")
      .limit(100)
      .onSnapshot((snap) => {
        const notifications = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            timestamp: data.timestamp ? toMoment(data.timestamp) : undefined,
          } as Notification;
        });
        setNotifications(notifications);
      });
  }, [notificationsRef]);

  return {
    notifications,
    markSeen,
  };
}
