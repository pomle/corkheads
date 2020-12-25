import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "components/ui/theme/themes";
import { Colors } from "components/ui/theme/colors";
import Photo from "components/ui/layout/Photo";
import { useUser } from "components/hooks/db/useUsers";

const useStyles = makeStyles((theme: Theme) => ({
  UserItem: {
    alignItems: "center",
    display: "grid",
    gridAutoFlow: "column",
    gridTemplateColumns: "72px auto",
  },
  photo: {
    borderRadius: "50%",
    overflow: "hidden",
    height: "64px",
    width: "64px",
  },
  content: {
    display: "grid",
    gridGap: "4px",
    padding: "8px",
  },
  displayName: {
    color: theme.color.action,
    fontSize: "14px",
    fontWeight: 700,
    gridColumn: "1 / 3",
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
    <div className={classes.UserItem}>
      <div className={classes.photo}>
        <Photo url={photoURL} />
      </div>
      <div className={classes.content}>
        <div className="username">
          {user?.username ? "@" + user.username : ""}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
