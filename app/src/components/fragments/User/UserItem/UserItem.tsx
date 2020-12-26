import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import RoundedImageItem from "components/ui/layout/RoundedImageItem";
import { useUser } from "components/hooks/db/useUsers";
import { Colors } from "components/ui/theme/colors";
import Badge from "components/ui/icons/Badge";
import UserDisplayName from "../DisplayName";

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
    width: "100%",
  },
  displayName: {
    color: Colors.Gold,
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 2",
  },
  username: {
    color: Colors.MarbleBlue,
    fontSize: "10px",
    gridColumn: "1 / 2",
  },
  stats: {
    alignSelf: "center",
    gridArea: "1 / 2 / 3 / 3",
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
      <div className={classes.content}>
        <div className={classes.displayName}>
          <UserDisplayName user={user} />
        </div>
        <div className={classes.stats}>
          <Badge type="badge">{user?.checkInCount}</Badge>
          <Badge type="diamond">{user?.collectionSize}</Badge>
        </div>
      </div>
    </RoundedImageItem>
  );
};

export default UserItem;
