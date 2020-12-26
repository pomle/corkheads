import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import RoundedImageItem from "components/ui/layout/RoundedImageItem";
import { useUser } from "components/hooks/db/useUsers";
import { Colors } from "components/ui/theme/colors";
import Badge from "components/ui/icons/Badge";
import UserDisplayName from "../DisplayName";
import Username from "../Username";

const useStyles = makeStyles((theme: Theme) => ({
  UserItem: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridGap: "4px",
    padding: "8px",
    width: "100%",
    "& .displayName": {
      color: Colors.Gold,
      fontSize: "14px",
      gridArea: "1 / 1 / 2 / 2",
    },
    "& .username": {
      color: Colors.MarbleBlue,
      fontSize: "10px",
      gridArea: "2 / 1 / 3 / 2",
    },
    "& .stats": {
      alignSelf: "center",
      display: "grid",
      gridArea: "1 / 2 / 3 / 3",
      gridAutoFlow: "column",
      "& > *": {
        margin: "2px",
      },
    },
  },
}));

interface UserItemProps {
  pointer: { userId: string };
}

const UserItem: React.FC<UserItemProps> = ({ pointer: { userId } }) => {
  const user = useUser(userId)?.data;
  const profile = user?.profile;
  const photoURL = profile?.photoURL;

  const classes = useStyles();

  return (
    <RoundedImageItem photoURL={photoURL}>
      <div className={classes.UserItem}>
        <div className="displayName">
          <UserDisplayName user={user} />
        </div>
        <div className="username">{user && <Username user={user} />}</div>
        <div className="stats">
          <Badge type="badge">{user?.checkInCount}</Badge>
          <Badge type="diamond">{user?.collectionSize}</Badge>
        </div>
      </div>
    </RoundedImageItem>
  );
};

export default UserItem;
