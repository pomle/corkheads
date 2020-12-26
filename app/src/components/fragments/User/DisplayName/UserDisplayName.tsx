import React from "react";
import { makeStyles } from "@material-ui/styles";
import { User } from "types/User";

const useStyles = makeStyles({
  UserDisplayName: {},
});

function resolveUserDisplayName(user?: User) {
  if (user) {
    const profile = user.profile;
    if (profile?.username) {
      return `@${profile.username}`;
    }
    if (profile?.displayName) {
      return profile.displayName;
    }
  }
  return "• • •";
}

interface UserDisplayNameProps {
  user?: User;
}

const UserDisplayName: React.FC<UserDisplayNameProps> = ({ user }) => {
  const classes = useStyles();

  return (
    <div className={classes.UserDisplayName}>
      {resolveUserDisplayName(user)}
    </div>
  );
};

export default UserDisplayName;
