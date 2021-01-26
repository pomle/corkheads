import React from "react";
import { Notification } from "types/Notification";
import ImageItem from "components/ui/layout/ImageItem";
import { useCheckIn } from "components/hooks/db/useCheckIns";
import { useUserVirtualArticle } from "components/hooks/db/useUserVirtualArticle";

interface NotificationPreviewProps {
  userId: string;
  notification: Notification;
}

const NotificationPreview: React.FC<NotificationPreviewProps> = ({
  userId,
  notification,
}) => {
  const checkIn = useCheckIn(notification?.type?.checkInId)?.data;
  const article = useUserVirtualArticle(userId, checkIn?.articleId);

  return (
    <ImageItem size={48} imageId={checkIn?.imageId || article?.imageId}>
      <div className="display">{article.displayName}</div>
    </ImageItem>
  );
};

export default NotificationPreview;
