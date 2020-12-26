import React from "react";
import { makeStyles } from "@material-ui/styles";
import { User } from "types/User";

const useStyles = makeStyles({
  UserHandle: {},
});

function resolveUserHandle(user?: User) {
  if (user) {
    const profile = user.profile;
    if (profile?.username) {
      return profile.username;
    }
    if (profile?.displayName) {
      return profile.displayName;
    }
  }
  return "• • •";
}

interface UserHandleProps {
  user?: User;
}

const UserHandle: React.FC<UserHandleProps> = ({ user }) => {
  const classes = useStyles();

  return <div className={classes.UserHandle}>{resolveUserHandle(user)}</div>;
};

export default UserHandle;
