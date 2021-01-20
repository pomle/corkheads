import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import RoundedImageItem from "components/ui/layout/RoundedImageItem";
import { useUser } from "components/hooks/db/useUsers";
import AvatarPlaceholder from "assets/graphics/avatar-placeholder.svg";
import Username from "../Username";
import UserDisplayName from "../DisplayName";

const useStyles = makeStyles((theme: Theme) => ({
  UserItem: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridGap: "4px",
    "& .displayName": {
      color: theme.color.title,
      fontSize: "14px",
      gridArea: "1 / 1 / 2 / 2",
    },
    "& .username": {
      fontSize: "10px",
      gridArea: "2 / 1 / 3 / 2",
    },
  },
}));

interface UserItemProps {
  pointer: { userId: string };
}

const UserItem: React.FC<UserItemProps> = ({ pointer: { userId } }) => {
  const user = useUser(userId)?.data;
  const profile = user?.profile;

  const classes = useStyles();

  return (
    <RoundedImageItem imageId={profile?.imageId} photoURL={AvatarPlaceholder}>
      <div className={classes.UserItem}>
        <div className="displayName">
          <UserDisplayName user={user} />
        </div>
        <div className="username">{user && <Username user={user} />}</div>
      </div>
    </RoundedImageItem>
  );
};

export default UserItem;
