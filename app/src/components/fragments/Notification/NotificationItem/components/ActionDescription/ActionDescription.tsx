import React from "react";
import { Notification } from "types/Notification";
import { User } from "types/User";
import UserHandle from "components/fragments/User/UserHandle";

interface ActionDescriptionProps {
  user: User;
  notification: Notification;
}

const ActionDescription: React.FC<ActionDescriptionProps> = ({
  notification,
  user,
}) => {
  const action = notification?.type?.name;
  if (action === "comment") {
    return (
      <>
        <b>
          <UserHandle user={user} />
        </b>{" "}
        commented on your check in
      </>
    );
  } else if (action === "reaction") {
    return (
      <>
        <b>
          <UserHandle user={user} />
        </b>{" "}
        reacted to your check in
      </>
    );
  }
  return <UserHandle user={user} />;
};

export default ActionDescription;
