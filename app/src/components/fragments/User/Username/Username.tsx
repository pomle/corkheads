import React from "react";
import { makeStyles } from "@material-ui/styles";
import { User } from "types/User";

const useStyles = makeStyles({
  Username: {},
});

function resolveUserName(user: User) {
  if (user.profile) {
    const profile = user.profile;
    if (profile.username) {
      return `@${profile.username}`;
    }
  }

  return null;
}

interface UsernameProps {
  user: User;
}

const Username: React.FC<UsernameProps> = ({ user }) => {
  const classes = useStyles();

  return <div className={classes.Username}>{resolveUserName(user)}</div>;
};

export default Username;
